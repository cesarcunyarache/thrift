import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono"; 
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.transacciones["bulk-create"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transacciones["bulk-create"]["$post"]>["json"]; 

export const useBulkCreateTransacciones = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transacciones["bulk-create"]["$post"]({ json });

      return await response.json();
      
    },
    onSuccess: () => {
      toast.success("Transacciones creadas exitosamente");
      queryClient.invalidateQueries({ queryKey: ["transacciones"] });
    },
    onError: () => {
      toast.error("Falló la creación de las transacciones");
    },
  });

  return mutation;
};