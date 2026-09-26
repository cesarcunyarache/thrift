import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetCuenta = ( id? : string ) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["cuenta", { id }],
    queryFn: async () => {

      const response = await client.api.cuentas[":id"].$get( { param: { id } });

      if (!response.ok) {
        throw new Error("Failed to fetch cuentas");
      }
      
      const { data } = await response.json();
      return data;
    },
    retry: false,
  });
  return query;
};
