import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono"; 
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";


type ResponseType = InferResponseType<typeof client.api.transacciones["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transacciones["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteTransacciones = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transacciones["bulk-delete"]["$post"]({
        json,  
      });

      return await response.json();
      
    },
    onSuccess: () => {
      toast.success("Transacciones eliminadas exitosamente");
      queryClient.invalidateQueries({ queryKey: ["transacciones"] });
    },
    onError: () => {
      toast.error("Falló la eliminación de las transacciones");
    },
  });

  return mutation;
};