import { toast } from "sonner";
import { InferResponseType } from "hono"; 
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";


type ResponseType = InferResponseType<typeof client.api.recordatorios[":id"]["$delete"]>;

export const useDeleteRecordatorio = (id: string) => {
  const queryClient = useQueryClient();

  console.log(id)
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {

      const response = await client.api.recordatorios[":id"]["$delete"]({
        param: { id }, 
      });

      return await response.json();
    },
    onSuccess: () => {
     /*  toast.success("Transacción eliminada exitosamente"); */
      queryClient.invalidateQueries({ queryKey: ["recordatorios"] }); 
      /* queryClient.invalidateQueries({ queryKey: ["transaccion", { id }] }); */
    },
    onError: () => {
      toast.error("Falló la eliminación de la recordatorio");
    },
  });

  return mutation;
};