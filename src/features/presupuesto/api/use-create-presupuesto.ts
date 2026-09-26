import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.presupuestos.$post>;
type RequestType = InferRequestType<typeof client.api.presupuestos.$post>["json"];

export const useCreatePresupuesto = () => {
  const query = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.presupuestos.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Presupuesto creado exitosamente");
      query.invalidateQueries({ queryKey: ["presupuestos"] });
    },
    onError: () => {
      toast.error("Falló la creación del presupuesto");
    },
  });

  return mutation;
};