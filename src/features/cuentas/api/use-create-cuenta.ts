import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.cuentas.$post>;
type RequestType = InferRequestType<typeof client.api.cuentas.$post>["json"];

export const useCreateCuenta = () => {
  const query = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.cuentas.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
    toast.success("Cuenta creada exitosamente");
      query.invalidateQueries({ queryKey: ["cuentas"] });
    }, 
    onError: () => {
      toast.error("Falló la creación de la cuenta");
    },
  });
  return mutation;
};
