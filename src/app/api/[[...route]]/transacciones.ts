import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import prismadb from "@/lib/prismadb";

import { parse, subDays } from "date-fns";


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

      const data = await prismadb.transacciones.findMany({
        // Buscar transacciones en la base de datos
        where: {
          AND: [
            accountId ? { cuentaId: accountId } : {},
            { cuenta: { userId: auth.userId } },
            { fecha: { gte: startDate } },
            { fecha: { lte: endDate } },
          ],
        },
        include: {
          cuenta: true,
          categoria: true,
        },
        orderBy: {
          fecha: "desc",
        },
      });

      return c.json({ data });
    }
  )
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "No id provided" }, 400);
      }

      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
      }

      const foundTransaction = await prismadb.transacciones.findFirst({
        where: {
          id: id,
          cuenta: { userId: auth.userId },
        },
        include: {
          cuenta: true,
          categoria: true,
        },
      });

      if (!foundTransaction) {
        return c.json({ error: `Transaction id ${id} not found` }, 404);
      }

      return c.json({ data: foundTransaction });
    }
  )
  .post(
    "/bulk-create",
    clerkMiddleware(),
    zValidator(
      "json",
      z.array(
        z.object({
          monto: z.number().min(1),
          beneficiario: z.string().min(1),
          notas: z.string().optional(),
          fecha: z.date(),
          cuentaId: z.string().min(1),
          categoriaId: z.string().optional(),
        })
      )
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
      }

      const data = await prismadb.transacciones.createMany({
        data: values.map((value) => ({
          monto: value.monto,
          beneficiario: value.beneficiario,
          notas: value.notas || "",
          fecha: value.fecha,
          cuentaId: value.cuentaId,
          categoriaId: value.categoriaId,
          userId: auth.userId,
        })),
        skipDuplicates: true,
      });

      return c.json({ data });
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        monto: z.number(),
        beneficiario: z.string().min(1),
        notas: z.string().optional(),
        fecha: z.coerce.date(),
        cuentaId: z.string().min(1),
        categoriaId: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
      }

      const data = await prismadb.transacciones.create({
        data: {
          monto: values.monto,
          beneficiario: values.beneficiario,
          notas: values.notas,
          fecha: values.fecha,
          cuentaId: values.cuentaId,
          categoriaId: values.categoriaId,
          userId: auth.userId,
        },
      });

      return c.json({ data });
    }
  )
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
      }

      const transactionsToDelete = await prismadb.transacciones.findMany({
        where: {
          id: { in: values.ids },
          cuenta: { userId: auth.userId },
        },
        select: {
          id: true,
        },
      });

      const transactionIdsToDelete = transactionsToDelete.map(
        (transaction) => transaction.id
      );

      const data = await prismadb.transacciones.deleteMany({
        where: {
          id: { in: transactionIdsToDelete },
        },
      });

      return c.json({ data });
    }
  )
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().min(1, "ID is required"),
      })
    ),
    zValidator(
      "json",
      z.object({
        monto: z.number(),
        beneficiario: z.string().min(1),
        notas: z.string().optional(),
        fecha: z.coerce.date(),
        cuentaId: z.string().min(1),
        categoriaId: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
      }

      const foundTransaction = await prismadb.transacciones.findUnique({
        where: {
          id: id,
          userId: auth.userId,
        },
      });

      if (!foundTransaction) {
        return c.json({ error: `Transaction with id ${id} not found` }, 404);
      }

      const data = await prismadb.transacciones.update({
        where: {
          id: id,
        },
        data: {
          ...values,
        },
      });

      return c.json({ data });
    }
  )
  .delete(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().min(1, "ID is required"),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
      }

      const foundTransaction = await prismadb.transacciones.findFirst({
        where: {
          id: id,
          cuenta: {
            userId: auth.userId,
          },
        },
      });

      if (!foundTransaction) {
        return c.json(
          {
            error: `Transaction with id ${id} not found or does not belong to the user`,
          },
          404
        );
      }

      const data = await prismadb.transacciones.delete({
        where: {
          id: id,
        },
      });

      return c.json({ data });
    }
  );

export default app;
