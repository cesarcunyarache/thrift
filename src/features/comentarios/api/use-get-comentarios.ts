 import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetComentarios = () => {
  const query = useQuery({
    queryKey: ["comentarios"],
    queryFn: async () => {
      const response = await client.api.comentarios.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch comentarios");
      }
      
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};