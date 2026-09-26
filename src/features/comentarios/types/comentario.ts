import { client } from "@/lib/hono";
import { InferResponseType } from "hono";

export type Comentario = InferResponseType<typeof client.api.comentarios.$get, 200>["data"][0]