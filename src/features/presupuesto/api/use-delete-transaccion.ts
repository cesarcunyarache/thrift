import { toast } from "sonner";
import { InferResponseType } from "hono"; 
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";


type ResponseType = InferResponseType<typeof client.api.transacciones[":id"]["$delete"]>;

export const useDeleteTransaccion = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {

      const response = await client.api.transacciones[":id"]["$delete"]({
        param: { id }, 
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transacción eliminada exitosamente");
      queryClient.invalidateQueries({ queryKey: ["transacciones"] }); 
      queryClient.invalidateQueries({ queryKey: ["transaccion", { id }] });
    },
    onError: () => {
      toast.error("Falló la eliminación de la transacción");
    },
  });

  return mutation;
};