import { client } from "@/lib/hono";
import { InferResponseType } from "hono";

export type Categoria = InferResponseType<typeof client.api.categorias.$get, 200>["data"][0]