import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetCuentas = () => {
  const query = useQuery({
    queryKey: ["cuentas"],
    queryFn: async () => {
      const response = await client.api.cuentas.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch cuentas");
      }
      
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
