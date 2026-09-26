import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { convertAmountFromiMiliunits } from "@/lib/utils";

export const useGetTransaccion = ( id : string ) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["transaccion", { id }],
    queryFn: async () => {

      const response = await client.api.transacciones[":id"].$get( { param: { id } });

      if (!response.ok) {
        throw new Error("Failed to fetch transacciones");
      }
      
      const { data } = await response.json();
      return { ...data, monto: convertAmountFromiMiliunits(data.monto) };
    },
    retry: false,
  });
  return query;
};
