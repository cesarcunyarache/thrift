"use client"


import { Card, CardContent } from "@/components/ui/card";


import { useRouter } from 'next/navigation';
import { Heading } from "@/components/heading";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useGetRecordatorios } from "@/features/recordatorios/api/use-get-recordatorios";

import { Recordatorio } from "@/features/recordatorios/types/recordatorio";
import { format } from "date-fns";
import { columnsTableRecordatorios } from "@/features/recordatorios/components/columns";
import { DataTable } from "@/components/data-table";

const CategoriasPage = () => {


  const { data,  isLoading } = useGetRecordatorios();
  const router = useRouter();

  const recordatorio: Recordatorio[] = (data ?? []).map((item : Recordatorio) => ({
    id: item.id,
    userId: item.userId,
    titulo: item.titulo,
    descripcion: item.descripcion,
    estado: item.estado,
    fecha: format(new Date(item.fecha), "M/d/yyyy HH:mm:ss"),
    activo: item.activo,
    periodo: item.periodo,
    recurrencia: item.recurrencia,
    presupuestoId: item.presupuestoId,
    presupuesto: item.presupuesto,
    monto: item.monto,  
    umbral: item.umbral,
    createdAt: format(new Date(item.createdAt), "M/d/yyyy"),
    updatedAt: format(new Date(item.updatedAt), "M/d/yyyy"),
    emailId: item.emailId,
  }));

  return (
    <>
      <Heading
        items={[
          { label: "Recordatorios", href: "/recordatorios" },
          { label: "Lista", href: "/recordatorios" },
        ]}
        title="Recordatorios"
        extraContent={
          <Button onClick={() =>{ router.push("/recordatorios/crear")}} className="ml-2">
            <PlusIcon className="size-4 mr-2" />
            Añadir nuevo
          </Button>
        }
      />
      <Card className="shadow-none border border-zinc-200 dark:border-zinc-700 mt-6 ">
        <CardContent>
          <DataTable filterKey="titulo" columns={columnsTableRecordatorios} data={recordatorio} isLoading={isLoading} />
        </CardContent>
      </Card>

     {/*  <Card className="shadow-none border border-zinc-200 dark:border-zinc-700 mt-6 ">
        <CardContent>
          <DataTablePresupuestos
            filterKey="monto"
            columns={columnsTablePresupuestos}
            data={presupuestos}
            isLoading={isLoading}
            filterCategories={categorias}
          />
        </CardContent>
      </Card> */}
    </>
  );
}

export default CategoriasPage;