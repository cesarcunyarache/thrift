import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.cuentas[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.cuentas[":id"]["$patch"]>["json"];

export const useUpdateCuenta = (id: string) => {
  const query = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      console.log(Error)
      const response = await client.api.cuentas[":id"]["$patch"]({json, param: { id } });
      console.log(true)
      return await response.json();
    },
    onSuccess: () => {
    toast.success("Cuenta actualizada exitosamente");
      query.invalidateQueries({ queryKey: ["cuentas"] });
      query.invalidateQueries({ queryKey: ["cuenta", { id }] });
    }, 
    onError: () => {
      toast.error("Falló la actualización de la cuenta");
    },
  });
  return mutation;
};
