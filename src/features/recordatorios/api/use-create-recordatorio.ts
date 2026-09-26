import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.recordatorios.$post>;
type RequestType = InferRequestType<typeof client.api.recordatorios.$post>["json"];

export const useCreateRecordatorio = () => {
  const query = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.recordatorios.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Recordatorio creado exitosamente");
      query.invalidateQueries({ queryKey: ["recordatorios"] });
    },
    onError: () => {
      toast.error("Falló la creación del recordatorio");
    },
  });

  return mutation;
};