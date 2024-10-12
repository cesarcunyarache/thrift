"use client"



import { Card, CardContent } from "@/components/ui/card";

import { DataTable } from "@/components/data-table";

import { useRouter } from 'next/navigation';
import { Heading } from "@/components/heading";

import { useGetTransacciones } from "@/features/transacciones/api/use-get-transacciones";
import { columnsTableTransacciones } from "@/features/transacciones/components/columns";

const TransaccionesPage = () => {


  const trasaccionesQuery = useGetTransacciones();
  const transacciones = trasaccionesQuery.data ?? [];
  const router = useRouter();


  return (
    <>
      <Heading
        items={[
          { label: "Transacciones", href: "/transacciones" },
          { label: "Lista", href: "/transacciones" },
        ]}
        title="Transacciones"
        buttonAction={() => router.push("/transacciones/crear")}
      />
      <Card className="shadow-none border border-zinc-200 dark:border-zinc-700 mt-6 ">
        <CardContent>
          <DataTable filterKey="nombre" columns={columnsTableTransacciones} data={transacciones} isLoading={trasaccionesQuery.isLoading} />
        </CardContent>
      </Card>
    </>
  );
}

export default TransaccionesPage;