import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.categorias[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.categorias[":id"]["$patch"]>["json"];

export const useUpdateCategorias = (id: string) => {
  const query = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categorias[":id"]["$patch"]({json, param: { id } });
      return await response.json();
    },
    onSuccess: () => {
    toast.success("Categoria actualizada exitosamente");
      query.invalidateQueries({ queryKey: ["categorias"] });
      query.invalidateQueries({ queryKey: ["categorias", { id }] });
    }, 
    onError: () => {
      toast.error("Falló la actualización de la categoria");
    },
  });
  return mutation;
};
