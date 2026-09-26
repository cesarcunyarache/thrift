import { client } from "@/lib/hono";
import { InferResponseType } from "hono";

export type Recordatorio = InferResponseType<typeof client.api.recordatorios.$get, 200>["data"][0]