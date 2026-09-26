import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.comentarios.$post>;
type RequestType = InferRequestType<typeof client.api.comentarios.$post>["json"];

export const useCreateComentarios = () => {
  const query = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.comentarios.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
    toast.success("Gracias por ayudarnos a mejorar. ¡Tu opinión es muy valiosa para nosotros!");
      query.invalidateQueries({ queryKey: ["comentarios"] });
    }, 
    onError: () => {
      toast.error("Falló la creación de la comentario");
    },
  });
  return mutation;
};