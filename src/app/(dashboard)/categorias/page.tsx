"use client"

import { format } from "date-fns";

import { Card, CardContent } from "@/components/ui/card";

import { DataTable } from "@/components/data-table";
import { useRouter } from 'next/navigation';

import { Heading } from "@/components/heading";
import { useGetCategorias } from "@/features/categorias/api/use-get-categorias";
import { CategoriasColumn, columnsTableCategorias } from "@/features/categorias/components/columns";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const AccountsPage = () => {

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
          { label: "Categorias", href: "/categorias" },
          { label: "Lista", href: "/categorias" },
        ]}
        title="Categorias"
        extraContent={
          <Button onClick={() => router.push("/categorias/crear")} className="ml-2">
            <PlusIcon className="size-4 mr-2" />
            Añadir nuevo
          </Button>
        }
      />
      <Card className="shadow-none border border-zinc-200 dark:border-zinc-700 mt-6 ">
        <CardContent>
          <DataTable filterKey="nombre" columns={columnsTableCategorias} data={categorias} isLoading={isLoading} />
        </CardContent>
      </Card>
    </>
  );
}

export default AccountsPage;