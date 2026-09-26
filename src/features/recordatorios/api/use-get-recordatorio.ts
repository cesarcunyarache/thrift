import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { convertAmountFromiMiliunits } from "@/lib/utils";

export const useGetRecordatorio = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["presupuesto", { id }],
    queryFn: async () => {
      const response = await client.api.recordatorios[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recordatorio");
      }

      const { data } = await response.json();
      return {
        ...data,
        monto: convertAmountFromiMiliunits(data.monto ?? 0),
        umbral: data.umbral ?? 0,
      };
    },
    retry: false,
  });
  return query;
};
