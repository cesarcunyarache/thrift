import { client } from "@/lib/hono";
import { InferResponseType } from "hono";

export type Presupuesto = InferResponseType<typeof client.api.presupuestos.$get, 200>["data"][0]