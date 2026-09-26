import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.categorias.$post>;
type RequestType = InferRequestType<typeof client.api.categorias.$post>["json"];

export const useCreateCategorias = () => {
  const query = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categorias.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
    toast.success("Categoria creada exitosamente");
      query.invalidateQueries({ queryKey: ["categorias"] });
    }, 
    onError: () => {
      toast.error("Falló la creación de la categoria");
    },
  });
  return mutation;
};