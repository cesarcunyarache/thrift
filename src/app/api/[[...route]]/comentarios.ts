import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import prismadb from "@/lib/prismadb";
import { clerkClient } from "@clerk/nextjs/server";

const app = new Hono()
  .get("/", async (c) => {
  

    const data = await prismadb.comentarios.findMany({
      where: {
        esVisible: true,
      },
      orderBy: {
        createdAt: "desc",
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

      const comentarioFound = await prismadb.comentarios.findUnique({
        where: {
          id: id,
          userId: auth.userId,
        },
      });

      if (!comentarioFound) {
        return c.json({ error: `Category id ${id} not found` }, 404);
      }
      return c.json({ data: comentarioFound });
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        comentario: z.string().min(1),
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

      const user = await clerkClient.users.getUser(auth.userId);

      const data = await prismadb.comentarios.create({
        data: {
          userId: auth.userId.toString(),
          nombre: user.fullName ?? "",
          email: user.emailAddresses[0].emailAddress,
          urlImagen: user.imageUrl,
          comentario: values.comentario,
        },
      });

      return c.json({ data });
    }
  )
  

export default app;

