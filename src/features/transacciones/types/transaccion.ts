import { client } from "@/lib/hono";
import { InferResponseType } from "hono";

export type Transaccion = InferResponseType<typeof client.api.transacciones.$get, 200>["data"][0]