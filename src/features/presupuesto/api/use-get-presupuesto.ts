import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { convertAmountFromiMiliunits } from "@/lib/utils";

export const useGetPresupuesto = ( id : string ) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["presupuesto", { id }],
    queryFn: async () => {

      const response = await client.api.presupuestos[":id"].$get( { param: { id } });

      if (!response.ok) {
        throw new Error("Failed to fetch presupuestos");
      }
      
      const { data } = await response.json();
      return { ...data, monto: convertAmountFromiMiliunits(data.monto) };
    },
    retry: false,
  });
  return query;
};
