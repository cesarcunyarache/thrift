import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.presupuestos[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.presupuestos[":id"]["$patch"]>["json"];

export const useUpdatePresupuesto = (id: string) => {
  const query = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.presupuestos[":id"]["$patch"]({
        json,
        param: { id }
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Presupuesto actualizado exitosamente");
      query.invalidateQueries({ queryKey: ["presupuestos"] }); 
      query.invalidateQueries({ queryKey: ["presupuesto", { id }] });  
    },
    onError: () => {
      toast.error("Falló la actualización del presupuesto");
    },
  });

  return mutation;
};