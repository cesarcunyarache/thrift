import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.transacciones[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.transacciones[":id"]["$patch"]>["json"];

export const useUpdateTransaccion = (id: string) => {
  const query = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transacciones[":id"]["$patch"]({
        json,
        param: { id }
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transacción actualizada exitosamente");
      query.invalidateQueries({ queryKey: ["transacciones"] }); 
      query.invalidateQueries({ queryKey: ["transaccion", { id }] });  
    },
    onError: () => {
      toast.error("Falló la actualización de la transacción");
    },
  });

  return mutation;
};