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

    const data = await prismadb.cuentas.findMany({
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
        id: z.string().optional(),
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

      const foundAccount = await prismadb.cuentas.findUnique({
        where: {
          id: id,
          userId: auth.userId,
        },
      });

      if (!foundAccount) {
        return c.json({ error: `Account id ${id} not found` }, 404);
      }
      return c.json({ data: foundAccount });
    }
  )
  .get("/paginated", async (c) => {
    const page = parseInt(c.req.query("page") || "1");
    const limit = parseInt(c.req.query("limit") || "5");
    const skip = (page - 1) * limit;

    const data = await prismadb.cuentas.findMany({
      where: {
        userId: "user_2n8PPbk3rGkJtlXZFu8BLov4FdR",
      },
      skip: skip,
      take: limit,
    });

    const totalRecords = await prismadb.cuentas.count({
      where: {
        userId: "user_2n8PPbk3rGkJtlXZFu8BLov4FdR",
      },
    });

    const totalPages = Math.ceil(totalRecords / limit);

    return c.json({
      data,
      meta: {
        currentPage: page,
        totalPages: totalPages,
        totalRecords: totalRecords,
      },
    });
  })
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

      const data = await prismadb.cuentas.create({
        data: {
          userId: auth.userId.toString(),
          nombre: values.nombre,
          plaidId: "123456789",
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
      /*   plaidId: z.string(),  */
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

      const foundAccount = await prismadb.cuentas.findUnique({
        where: {
          id: id,
          userId: auth.userId,
        },
      });
  
      if (!foundAccount) {
        return c.json({ error: `Account with id ${id} not found` }, 404);
      }
  
     
      const data = await prismadb.cuentas.update({
        where: {
          id: id,
        },
        data: {
          nombre: values.nombre,
          plaidId: "123456789"
        },
      });

      return c.json({ data });
    }
  )
  
  

export default app;
