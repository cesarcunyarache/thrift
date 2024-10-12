import { client } from "@/lib/hono";
import { InferResponseType } from "hono";

export type Cuenta = InferResponseType<typeof client.api.cuentas.$get, 200>["data"][0]