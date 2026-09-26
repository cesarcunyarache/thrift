"use client"

/* import { format } from "date-fns"; */

import { Card, CardContent, /* CardContent  */ } from "@/components/ui/card";


/* import { useRouter } from 'next/navigation'; */
import { Heading } from "@/components/heading";


import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useGetPresupuestos } from "@/features/presupuesto/api/use-get-presupuestos";
import { Presupuesto } from "@/features/presupuesto/types/presupuesto";
import { columnsTablePresupuestos } from "@/features/presupuesto/components/columns";
import { DataTablePresupuestos } from "@/components/data-table-presupuestos";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const PresupuestoPage = () => {


  const { data, isLoading, } = useGetPresupuestos();
  const router = useRouter();

  const presupuestos: Presupuesto[] = (data ?? []).map((item) => ({
    id: item.id,
    descripcion: item.descripcion,
    monto: item.monto,
    fechaFin: format(new Date(item.fechaFin), "d/M/yyyy"),
    fechaInicio: format(new Date(item.fechaInicio), "d/M/yyyy"),
    categoria: item.categoria,
    periodo: item.periodo,
    recurrencia: item.recurrencia,
    sumaTransacciones: item.sumaTransacciones,
    categoriaId: item.categoriaId,

    /* createdAt: format(new Date(item.createdAt), "M/d/yyyy"),
     updatedAt: format(new Date(item.updatedAt), "M/d/yyyy"),   */
  }));

  const categorias = Array.from(
    presupuestos.reduce((map, item) => {
      const categoria = item.categoria;
      if (categoria && !map.has(categoria.id)) {
        map.set(categoria.id, { label: categoria.nombre, value: categoria.id });
      }
      return map;
    }, new Map())
  ).map(([, categoria]) => categoria);



  return (
    <>
      <Heading
        items={[
          { label: "Presupuestos", href: "/presupuestos" },
          { label: "Lista", href: "/presupuestos" },
        ]}
        title="Presupuestos"
        extraContent={
          <Button onClick={() => router.push("/presupuestos/crear")} className="ml-2 text-white">
            <PlusIcon className="size-4 mr-2" />
            Añadir nuevo
          </Button>
        }
      />
      <Card className="shadow-none border border-zinc-200 dark:border-zinc-700 mt-6 ">
        <CardContent>
          <DataTablePresupuestos
            filterKey="monto"
            columns={columnsTablePresupuestos}
            data={presupuestos}
            isLoading={isLoading}
            filterCategories={categorias}
          />
        </CardContent>

      </Card>
    </>
  );
}

export default PresupuestoPage;