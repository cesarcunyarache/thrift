import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import prismadb from "@/lib/prismadb";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      throw new HTTPException(401, {
        res: c.json({ error: "Unauthorized" }, 401),
      });
    }

    const data = await prismadb.categorias.findMany({
      where: {
        userId: auth.userId,
      },
    });
    return c.json({ data });
  })
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

      const foundCategory = await prismadb.categorias.findUnique({
        where: {
          id: id,
          userId: auth.userId,
        },
      });

      if (!foundCategory) {
        return c.json({ error: `Category id ${id} not found` }, 404);
      }
      return c.json({ data: foundCategory });
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        nombre: z.string(),
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

      const data = await prismadb.categorias.create({
        data: {
          userId: auth.userId.toString(),
          nombre: values.nombre,
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
        nombre: z.string(),
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

      const foundCategory = await prismadb.categorias.findUnique({
        where: {
          id: id,
          userId: auth.userId,
        },
      });

      if (!foundCategory) {
        return c.json({ error: `Category with id ${id} not found` }, 404);
      }

      const data = await prismadb.categorias.update({
        where: {
          id: id,
        },
        data: {
          nombre: values.nombre,
        },
      });

      return c.json({ data });
    }
  );

export default app;

