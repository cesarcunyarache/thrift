import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetComentario = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["comentario", id],
    queryFn: async () => {

      const response = await client.api.comentarios.$get({ id });

      if (!response.ok) {
        throw new Error("Failed to fetch comentario");
      }
      
      const { data } = await response.json();
      return data;
    },
    retry: false,
  });
  return query;
};
