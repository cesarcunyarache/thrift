import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transacciones.$post>;
type RequestType = InferRequestType<
  typeof client.api.transacciones.$post
>["json"];

export const useCreateTransaccion = () => {
  const query = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transacciones.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transacción creada exitosamente");
      query.invalidateQueries({ queryKey: ["transacciones"] });
      query.invalidateQueries({ queryKey: ["presupuestos"] });
      query.invalidateQueries({ queryKey: ["recordatorios"] });
    },
    onError: () => {
      toast.error("Falló la creación de la transacción");
    },
  });

  return mutation;
};
