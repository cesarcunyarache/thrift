import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import prismadb from "@/lib/prismadb";
import { Periodo, EstadoRecordatorio } from "@prisma/client";
import { Resend } from "resend";
import { calculateNextDate, convertAmountFromiMiliunits } from "@/lib/utils";

import { Decimal } from "@prisma/client/runtime/library";
import EmailTemplate from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const recordatorios = await prismadb.recordatorios.findMany({
      where: {
        userId: auth.userId,
        presupuestoId: { not: null },
      },
      include: { presupuesto: true },
    });

    for (const recordatorio of recordatorios) {
      if (
        recordatorio.recurrencia &&
        new Date(recordatorio.fecha) < new Date()
      ) {
        const newDate = calculateNextDate(
          new Date(recordatorio.fecha),
          recordatorio.periodo,
        );

        const clerkClient = c.get("clerk");

        const user = await clerkClient.users.getUser(auth.userId);

        const oneMinuteFromNow = new Date(
          new Date(newDate).getTime() + 1000 * 60,
        ).toISOString();

        const { data, error } = await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: [user.emailAddresses[0].emailAddress],
          subject: "Recordatorio",
          react: EmailTemplate({
            userFirstname: user.fullName,
            title: recordatorio.titulo,
            description: recordatorio.descripcion,
          }),
          scheduledAt: oneMinuteFromNow,
        });

        if (error) {
          console.log(error);
        }

        if (data) {
          const { id } = data;

          await prismadb.recordatorios.update({
            where: { id: recordatorio.id },
            data: { emailId: id, fecha: newDate },
          });
        }
      }

      const presupuesto = recordatorio.presupuesto;

      if (!presupuesto) continue;

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
        _sum: { monto: true },
      });

      const montoActual = convertAmountFromiMiliunits(
        Math.abs(sumaTransacciones._sum.monto || 0),
      );

      const umbral = recordatorio.umbral ?? 0.0;
      const monto = convertAmountFromiMiliunits(recordatorio.monto || 0);
      const presupuestoMonto = convertAmountFromiMiliunits(presupuesto.monto);

      const thresholds = {
        activo: monto > 0 ? monto : presupuestoMonto * (Number(umbral) || 0),
        estaCerca:
          monto > 0
            ? monto * 0.9
            : presupuestoMonto * (Number(umbral) || 0) * 0.9,
      };

      const estado =
        montoActual >= thresholds.activo
          ? EstadoRecordatorio.EN_PROCESO
          : montoActual > thresholds.estaCerca
            ? EstadoRecordatorio.PROXIMO
            : EstadoRecordatorio.PENDIENTE;

      if (estado === EstadoRecordatorio.PROXIMO) {
        if (recordatorio.estado === EstadoRecordatorio.PROXIMO_RECIBIDO)
          continue;
      }

      if (estado === EstadoRecordatorio.EN_PROCESO) {
        if (recordatorio.estado === EstadoRecordatorio.REALIZADO) continue;
      }

      if (estado) {
        await prismadb.recordatorios.update({
          where: { id: recordatorio.id },
          data: { estado },
        });
      }
    }

    const data = await prismadb.recordatorios.findMany({
      where: { userId: auth.userId },
      include: {
        presupuesto: {
          include: { categoria: true },
        },
      },
    });

    return c.json({ data });
  })
  .get("/notifications", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const recordatorios = await prismadb.recordatorios.findMany({
      where: {
        userId: auth.userId,
        presupuestoId: { not: null },
      },
      include: { presupuesto: true },
    });

    for (const recordatorio of recordatorios) {
      const presupuesto = recordatorio.presupuesto;

      if (presupuesto) {
        const sumaTransacciones = await prismadb.transacciones.aggregate({
          where: {
            categoriaId: presupuesto.categoriaId,
            userId: auth.userId,
            fecha: {
              gte: presupuesto.fechaInicio,
              lte: presupuesto.fechaFin,
            },
          },
          _sum: { monto: true },
        });

        const montoActual = convertAmountFromiMiliunits(
          sumaTransacciones._sum.monto || 0,
        );

        const umbral: Decimal | null = recordatorio.umbral;
        const monto = convertAmountFromiMiliunits(recordatorio.monto || 0);
        let estaCerca = false;
        let activo = false;

        if (monto == 0 || montoActual == null) {
          if (umbral != null && typeof umbral === "number") {
            activo = montoActual >= presupuesto.monto * umbral;
            estaCerca =
              montoActual >
              convertAmountFromiMiliunits(presupuesto.monto) * umbral * 0.9;
          }
        } else {
          activo = montoActual >= monto;
          estaCerca = montoActual > monto * 0.9;
        }

        if (activo) {
          await prismadb.recordatorios.update({
            where: { id: recordatorio.id },
            data: { estado: EstadoRecordatorio.EN_PROCESO },
          });
        }

        if (estaCerca && !activo) {
          await prismadb.recordatorios.update({
            where: { id: recordatorio.id },
            data: { estado: EstadoRecordatorio.PROXIMO },
          });
        }
      }
    }
    const data = await prismadb.recordatorios.findMany({
      where: { userId: auth.userId },
      include: {
        presupuesto: {
          include: { categoria: true },
        },
      },
    });

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

      const recordatorio = await prismadb.recordatorios.findUnique({
        where: { id },
        include: { presupuesto: true },
      });

      if (!recordatorio || recordatorio.userId !== auth.userId) {
        return c.json({ error: `Recordatorio with id ${id} not found` }, 404);
      }

      return c.json({ data: recordatorio });
    },
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        titulo: z.string().min(1),
        descripcion: z.string().optional(),
        estado: z.nativeEnum(EstadoRecordatorio),
        fecha: z.coerce.date(),
        activo: z.coerce.date().optional(),
        periodo: z.nativeEnum(Periodo).optional(),
        recurrencia: z.boolean().default(false),
        presupuestoId: z.string().optional(),
        umbral: z.number().nullable().optional(),
        monto: z.number().nullable().optional(),
      }),
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!values.presupuestoId) {
        const clerkClient = c.get("clerk");

        const user = await clerkClient.users.getUser(auth.userId);

        const oneMinuteFromNow = new Date(
          new Date(values.fecha).getTime() + 1000 * 60,
        ).toISOString();

        const { data, error } = await resend.emails.send({
          from: "Thrift <noreply@thrift-dev.app>",
          to: [user.emailAddresses[0].emailAddress],
          subject: "Recordatorio",
          react: EmailTemplate({
            userFirstname: user.fullName,
            title: values.titulo,
            description: values.descripcion,
          }),
          scheduledAt: oneMinuteFromNow,
        });

        console.log(data, error);

        if (error) {
          return c.json({ error: "Bad request", status: 400 });
        }

        if (data) {
          const { id } = data;

          const recordatorio = await prismadb.recordatorios.create({
            data: {
              userId: auth.userId,
              emailId: id,
              presupuestoId:
                values.presupuestoId == "" ? null : values.presupuestoId,
              ...values,
            },
          });

          return c.json({ data: recordatorio });
        } else {
          return c.json({ error: "Bad request", status: 400 });
        }
      } else {
        const recordatorio = await prismadb.recordatorios.create({
          data: {
            userId: auth.userId,
            emailId: null,
            ...values,
          },
        });

        return c.json({ data: recordatorio });
      }
    },
  )
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator(
      "json",
      z.object({
        titulo: z.string().min(1),
        descripcion: z.string().optional(),
        estado: z.nativeEnum(EstadoRecordatorio).optional(),
        fecha: z.coerce.date(),
        activo: z.coerce.date().optional(),
        periodo: z.nativeEnum(Periodo).optional(),
        recurrencia: z.boolean().optional(),
        presupuestoId: z.string().optional(),
        umbral: z.number().optional(),
        monto: z.number().nullable().optional(),
      }),
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id: idRecordatorio } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const foundRecordatorio = await prismadb.recordatorios.findUnique({
        where: { id: idRecordatorio },
      });

      if (!foundRecordatorio || foundRecordatorio.userId !== auth.userId) {
        return c.json(
          { error: `Recordatorio with id ${idRecordatorio} not found` },
          404,
        );
      }

      if (!values.presupuestoId) {
        if (foundRecordatorio.emailId) {
          resend.emails.cancel(foundRecordatorio.emailId);
        }

        const clerkClient = c.get("clerk");

        const user = await clerkClient.users.getUser(auth.userId);

        const oneMinuteFromNow = new Date(
          new Date(values.fecha).getTime() + 1000 * 60,
        ).toISOString();

        const { data, error } = await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: [user.emailAddresses[0].emailAddress],
          subject: "Recordatorio",
          react: EmailTemplate({
            userFirstname: user.fullName,
            title: values.titulo,
            description: values.descripcion,
          }),
          scheduledAt: oneMinuteFromNow,
        });

        if (error) {
          return c.json({ error: "Bad request", status: 400 });
        }

        if (data) {
          const { id } = data;

          try {
            const updatedRecordatorio = await prismadb.recordatorios.update({
              where: { id: idRecordatorio },
              data: { ...values, emailId: id },
            });

            return c.json({ data: updatedRecordatorio });
          } catch (error) {
            return c.json({ error: "Bad request", status: 400 });
          }
        } else {
          return c.json({ error: "Bad request", status: 400 });
        }
      } else {
        const updatedRecordatorio = await prismadb.recordatorios.update({
          where: { id: idRecordatorio },
          data: { ...values },
        });

        return c.json({ data: updatedRecordatorio });
      }
    },
  )
  .delete(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      console.log("delete");
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const recordatorio = await prismadb.recordatorios.findUnique({
        where: { id },
      });

      if (!recordatorio || recordatorio.userId !== auth.userId) {
        return c.json({ error: `Recordatorio with id ${id} not found` }, 404);
      }

      if (recordatorio.estado === EstadoRecordatorio.PROXIMO) {
        await prismadb.recordatorios.update({
          where: {
            id,
          },
          data: {
            estado: EstadoRecordatorio.PROXIMO_RECIBIDO,
          },
        });
      } else if (recordatorio.estado === EstadoRecordatorio.EN_PROCESO) {
        await prismadb.recordatorios.update({
          where: {
            id,
          },
          data: {
            estado: EstadoRecordatorio.REALIZADO,
          },
        });
      }

      return c.json({ message: "Recordatorio deleted successfully" });
    },
  );

export default app;
