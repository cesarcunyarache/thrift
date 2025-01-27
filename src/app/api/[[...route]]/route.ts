import { Hono } from "hono";
import { handle } from "hono/vercel";

import cuentas from "./cuentas";
import categorias from "./categorias";
import transacciones from "./transacciones";

import { HTTPException } from "hono/http-exception";

/* export const runtime = "edge";  */

const app = new Hono().basePath("/api");

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json({ error: "Internal Server Error" }, 500);
});

const routes = app
        .route("/cuentas", cuentas)
        .route("/categorias", categorias)
        .route("/transacciones", transacciones)

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
