import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";
import { convertAmountFromiMiliunits } from "@/lib/utils";

export const useGetTransacciones = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    queryKey: ["transacciones", {from, to, accountId}],
    queryFn: async () => {
      const response = await client.api.transacciones.$get({
        query: {
          from,
          to,
          accountId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transacciones");
      }

      const { data } = await response.json();
      return data.map((item) => ({
        ...item,
        monto: convertAmountFromiMiliunits(item.monto),
      }));  
    },
  });
  return query;
};
