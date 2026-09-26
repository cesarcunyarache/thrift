import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.recordatorios[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.recordatorios[":id"]["$patch"]>["json"];

export const useUpdateRecordatorio = (id: string) => {
  const query = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.recordatorios[":id"]["$patch"]({
        json,
        param: { id }
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Recordatorio actualizado exitosamente");
      query.invalidateQueries({ queryKey: ["recordatorios"] }); 
      query.invalidateQueries({ queryKey: ["presupuesto", { id }] });  
    },
    onError: () => {
      toast.error("Falló la actualización del recordatorio");
    },
  });

  return mutation;
};