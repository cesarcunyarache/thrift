"use client"

import { format } from "date-fns";

import { Card, CardContent } from "@/components/ui/card";

import { columnsTableCategorias, CategoriasColumn } from "@/features/categorias/components/columns";
import { DataTable } from "@/components/data-table";

import { useRouter } from 'next/navigation';
import { Heading } from "@/components/heading";
import { useGetCategorias } from "@/features/categorias/api/use-get-categorias";

const CategoriasPage = () => {


  const { data, isLoading, } = useGetCategorias();
  const router = useRouter();

  const categorias: CategoriasColumn[] = (data ?? []).map((item) => ({
    id: item.id,
    nombre: item.nombre,
    userId: item.userId,
    createdAt: format(new Date(item.createdAt), "M/d/yyyy"),
    updatedAt: format(new Date(item.updatedAt), "M/d/yyyy"),
  }));

  return (
    <>
      <Heading
        items={[
          { label: "Categorías", href: "/categorias" },
          { label: "Lista", href: "/categorias" },
        ]}
        title="Categorías"
        buttonAction={() => router.push("/categorias/crear")}
      />
      <Card className="shadow-none border border-zinc-200 dark:border-zinc-700 mt-6 ">
        <CardContent>
          <DataTable filterKey="nombre" columns={columnsTableCategorias} data={categorias} isLoading={isLoading} />
        </CardContent>
      </Card>
    </>
  );
}

export default CategoriasPage;