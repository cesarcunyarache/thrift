import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import prismadb from "@/lib/prismadb";
import { Periodo } from "@prisma/client";
import {
  calculateInitialAndFinalDates,
  convertAmountFromiMiliunits,
  generateNewDateRange,
} from "@/lib/utils";


const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const presupuestos = await prismadb.presupuestos.findMany({
      include: {
        categoria: true,
      },
      where: {
        userId: auth.userId,
      },
    });

    const data = await Promise.all(
      presupuestos.map(async (presupuesto) => {

        if (presupuesto.recurrencia) {
          const hoy = new Date();
          hoy.setHours(0, 0, 0, 0);
          
          if (presupuesto.fechaFin < hoy) {
            let fechas = null;

            if (presupuesto.periodo === "PERSONALIZADO") {
              const result = generateNewDateRange(
                presupuesto.fechaInicio,
                presupuesto.fechaFin
              );
              fechas = {
                fechaInicio: result!.fechaInicio,
                fechaFin: result!.fechaFin,
              };
            } else {
              const result = calculateInitialAndFinalDates(presupuesto.periodo);
              fechas = {
                fechaInicio: result!.fechaInicio,
                fechaFin: result!.fechaFin,
              };
            }

            if (fechas) {
              await prismadb.presupuestos.update({
                where: {
                  id: presupuesto.id,
                },
                data: {
                  fechaInicio: fechas.fechaInicio,
                  fechaFin: fechas.fechaFin,
                },
              });
            }
          }
        }

        const sumaTransacciones = await prismadb.transacciones.aggregate({
          where: {
            categoriaId: presupuesto.categoriaId,
            userId: auth.userId,
            fecha: {
              gte: presupuesto.fechaInicio,
              lte: presupuesto.fechaFin,
            },
            monto: {
              lt: 0, 
            },
          },
          _sum: {
            monto: true,
          },
        });

        return {
          id: presupuesto.id,
          fechaInicio: presupuesto.fechaInicio,
          fechaFin: presupuesto.fechaFin,
          monto: presupuesto.monto,
          categoriaId: presupuesto.categoriaId,
          descripcion: presupuesto.descripcion,
          recurrencia: presupuesto.recurrencia,
          periodo: presupuesto.periodo,
          categoria: presupuesto.categoria,
          sumaTransacciones: convertAmountFromiMiliunits(
            sumaTransacciones._sum.monto || 0
          ),
        };
      })
    );

    return c.json({ data });
  })
  .get(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const presupuesto = await prismadb.presupuestos.findUnique({
        where: {
          id,
          userId: auth.userId,
        },
        include: {
          categoria: true,
        },
      });

      if (!presupuesto || presupuesto.userId !== auth.userId) {
        return c.json({ error: `Presupuesto with id ${id} not found` }, 404);
      }

      return c.json({ data: presupuesto });
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        descripcion: z.string().optional(),
        categoriaId: z
          .string()
          .min(1, { message: "El campo categoria es requerido" }),
        periodo: z.nativeEnum(Periodo, {
          message: "El campo periodo es requerido",
        }),
        monto: z.number(),
        recurrencia: z.boolean().default(false),
        fechaInicio: z.coerce.date(),
        fechaFin: z.coerce.date(),
      })
    ),

    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const presupuesto = await prismadb.presupuestos.create({
        data: {
          userId: auth.userId,
          ...values,
        },
      });

      return c.json({ data: presupuesto });
    }
  )
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()), // Validar que sea una lista de IDs
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { ids } = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // Buscar los presupuestos que el usuario quiere eliminar
      const presupuestosToDelete = await prismadb.presupuestos.findMany({
        where: {
          id: { in: ids },
          userId: auth.userId,
        },
        select: {
          id: true,
        },
      });

      const presupuestoIdsToDelete = presupuestosToDelete.map(
        (presupuesto) => presupuesto.id
      );

      // Eliminar los presupuestos del usuario
      const data = await prismadb.presupuestos.deleteMany({
        where: {
          id: { in: presupuestoIdsToDelete },
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
        id: z.string(),
      })
    ),
    zValidator(
      "json",
      z.object({
        descripcion: z.string().optional(),
        categoriaId: z
          .string()
          .min(1, { message: "El campo categoria es requerido" }),
        periodo: z.nativeEnum(Periodo, {
          message: "El campo periodo es requerido",
        }),
        monto: z.number(),
        recurrencia: z.boolean().default(false),
        fechaInicio: z.coerce.date(),
        fechaFin: z.coerce.date(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const foundPresupuesto = await prismadb.presupuestos.findUnique({
        where: {
          id,
          userId: auth.userId,
        },
      });

      if (!foundPresupuesto) {
        return c.json({ error: `Presupuesto with id ${id} not found` }, 404);
      }

      const updatedPresupuesto = await prismadb.presupuestos.update({
        where: {
          id,
        },
        data: {
          ...values,
        },
      });

      return c.json({ data: updatedPresupuesto });
    }
  )
  .delete(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const presupuesto = await prismadb.presupuestos.findUnique({
        where: { id },
      });

      if (!presupuesto || presupuesto.userId !== auth.userId) {
        return c.json({ error: `Presupuesto with id ${id} not found` }, 404);
      }

      await prismadb.presupuestos.delete({
        where: { id },
      });

      return c.json({ message: "Presupuesto deleted successfully" });
    }
  );

export default app;
