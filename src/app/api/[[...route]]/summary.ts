import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import prismadb from "@/lib/prismadb";

import { differenceInDays, parse, subDays } from "date-fns";
import { calculatePercentageChange, fillMissingDates } from "@/lib/utils";

const app = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        from: z.string().optional(),
        to: z.string().optional(),
        accountId: z.string().optional(),
      })
    ),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      const { from, to, accountId } = c.req.valid("query");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const defaultTo = new Date();
      const defaultFrom = subDays(new Date(), 30);

      const startDate = from
        ? parse(from, "yyyy-MM-dd", new Date())
        : defaultFrom;
      const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

      const periodLength = differenceInDays(endDate, startDate) + 1;
      const lastPeriodStart = subDays(startDate, periodLength);
      const lastPeriodEnd = subDays(endDate, periodLength);

      async function fetchFinancialData(userId: string, startDate: Date, endDate: Date, accountId?: string) {
        const income = await prismadb.transacciones.aggregate({
          _sum: {
            monto: true,
          },
          where: {
            AND: [
              { cuenta: { userId } },
              { fecha: { gte: startDate, lte: endDate } },
              accountId ? { cuentaId: accountId } : {},
              { monto: { gte: 0 } },
            ],
          },
        });

        const expenses = await prismadb.transacciones.aggregate({
          _sum: {
            monto: true,
          },
          where: {
            AND: [
              { cuenta: { userId } },
              { fecha: { gte: startDate, lte: endDate } },
              accountId ? { cuentaId: accountId } : {},
              { monto: { lt: 0 } }, 
            ],
          },
        });

        const totalBalance = await prismadb.transacciones.aggregate({
          _sum: {
            monto: true,
          },
          where: {
            AND: [
              { cuenta: { userId } },
              { fecha: { gte: startDate, lte: endDate } },
              accountId ? { cuentaId: accountId } : {},
            ],
          },
        });

        return {
          income: income._sum.monto || 0,
          expenses: expenses._sum.monto || 0,
          remaining: totalBalance._sum.monto || 0,
        };
      }

      const currentPeriod = await fetchFinancialData(
        auth.userId,
        startDate,
        endDate
      )

      const lastPeriod = await fetchFinancialData(
        auth.userId,
        lastPeriodStart,
        lastPeriodEnd
      )

      
      const incomeChange = calculatePercentageChange(currentPeriod.income, lastPeriod.income);
      
     /*  console.log(startDate, endDate);
      console.log(currentPeriod)

      console.log('.....................................................')
      console.log(lastPeriodStart, lastPeriodEnd);
      console.log(lastPeriod) */

      const expensesChange = calculatePercentageChange(currentPeriod.expenses, lastPeriod.expenses);
      const remainingChange = calculatePercentageChange(currentPeriod.remaining, lastPeriod.remaining);

      const categorySummary = await prismadb.transacciones.groupBy({
        by: ['categoriaId'],
        where: {
          AND: [
            accountId ? { cuentaId: accountId } : {},
            { cuenta: { userId: auth.userId } },
            { monto: { not: 0 } },
            { fecha: { gte: startDate, lte: endDate } }
          ],
        },
        _sum: {
          monto: true,
        },
        orderBy: {
          _sum: {
            monto: 'desc',
          },
        },
      });

      const category = await Promise.all(
        categorySummary.map(async (category) => {
          const categoryName = await prismadb.categorias.findUnique({
            where: { id: category.categoriaId ?? '' },
            select: { nombre: true },
          });
      
          return {
            name: categoryName?.nombre || 'Sin categoría',
            value: Math.abs(category._sum.monto || 0),
          };
        })
      );

      const topCategories = category.slice(0, 3);
      const otherCategories = category.slice(3);
      const otherSum = otherCategories.reduce((sum, current) => sum + current.value, 0);

      const finalCategories = topCategories;
      
      if (otherCategories.length > 0) {
        finalCategories.push({
          name: 'Otros',
          value: otherSum,
          
        });
      }

      const incomeByDate = await prismadb.transacciones.groupBy({
        by: ['fecha'],
        where: {
          AND: [
            { cuenta: { userId: auth.userId } },
            { monto: { gte: 0 } }, 
            { fecha: { gte: startDate, lte: endDate } },
            accountId ? { cuentaId: accountId } : {},
          ],
        },
        _sum: {
          monto: true,
        },
        orderBy: {
          fecha: 'asc',
        },
      });
    
      const expensesByDate = await prismadb.transacciones.groupBy({
        by: ['fecha'],
        where: {
          AND: [
            { cuenta: { userId: auth.userId } },
            { monto: { lt: 0 } }, // Solo gastos
            { fecha: { gte: startDate, lte: endDate } },
            accountId ? { cuentaId: accountId } : {},
          ],
        },
        _sum: {
          monto: true,
        },
        orderBy: {
          fecha: 'asc',
        },
      });
    
      const activeDays = incomeByDate.map((income) => {
        const expense = expensesByDate.find((exp) => exp.fecha.getTime() === income.fecha.getTime());
        return {
          date: income.fecha,
          income: income._sum.monto || 0,
          expenses: Math.abs(expense?._sum.monto || 0),
        };
      });

      expensesByDate.forEach((expense) => {
        if (!activeDays.some((day) => day.date.getTime() === expense.fecha.getTime())) {
          activeDays.push({
            date: expense.fecha,
            income: 0,
            expenses: Math.abs(expense._sum.monto || 0),
          });
        }
      });
    
      activeDays.sort((a, b) => a.date.getTime() - b.date.getTime());

      const days = fillMissingDates(activeDays, startDate, endDate);

      return c.json({
        data: {
          /* currentPeriod,
          lastPeriod,
          incomeChange,
          expensesChange,
          remainingChange,
          finalCategories,
          activeDays,
          days */
          remainingAmount: currentPeriod.remaining,
          remainingChange,
          incomeAmount: currentPeriod.income,
          incomeChange,
          expensesAmount: currentPeriod.expenses,
          expensesChange,
          categories: finalCategories,
          days
        },
      });
    }
  )

export default app;
