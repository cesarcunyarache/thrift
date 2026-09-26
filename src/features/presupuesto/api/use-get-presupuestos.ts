import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";
import { convertAmountFromiMiliunits } from "@/lib/utils";

export const useGetPresupuestos = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    queryKey: ["presupuestos", {from, to, accountId}],
    queryFn: async () => {
      const response = await client.api.presupuestos.$get({
        query: {
          from,
          to,
          accountId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch presupuestos");
      }

      const { data } = await response.json();
      return data.map((item) => ({
        ...item,
        monto: convertAmountFromiMiliunits(item.monto),
        sumaTransacciones: Math.abs(item.sumaTransacciones)
      }));  
    },
  });
  return query;
};
