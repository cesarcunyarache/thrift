
"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Recordatorio } from "../types/recordatorio"
import { Badge } from "@/components/ui/badge"
import { capitalizeFirstLetter, convertAmountFromiMiliunits, formatCurrency } from "@/lib/utils"

const CellActions = ({ recordatorio }: { recordatorio: Recordatorio }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => router.push(`/recordatorios/${recordatorio.id}/editar`)}
        >
          Editar
        </DropdownMenuItem>
        {/* Puedes agregar más acciones si es necesario */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columnsTableRecordatorios: ColumnDef<Recordatorio>[] = [
  /* {
    accessorKey: "fecha",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.fecha);
      return <span>{format(date, "PPP", { locale: es })}</span>;
    },
  }, */
  /*  {
     accessorKey: "categoriaId",
     header: ({ column }) => {
       return (
         <Button
           variant="ghost"
           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
         >
           Categoria
           <ArrowUpDown className="ml-2 h-4 w-4" />
         </Button>
       );
     },
     cell: ({ row }) => {
       return (
          <CategoryColumn 
             category={row.original.categoria?.nombre ?? null} 
             categroyId={row.original.categoria?.id ?? null}
             id={row.original.id}
           /> 
       )
     }
   }, */
  {
    accessorKey: "titulo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Titulo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "descripcion",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descripción
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  /* {
    accessorKey: "monto",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Presupuesto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("monto"));
      return (
        <Badge
          variant={amount < 0 ? "destructive" : "default"}
          className="text-xs font-medium PX.3.5 py-2.5"
        >
          {formatCurrency(amount)}
        </Badge>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const monto = String(row.getValue(columnId));  // Convertimos el monto a string
      return monto.includes(filterValue);
    },
  }, */
  /* {
    accessorKey: "sumaTransacciones",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Monto gastado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("sumaTransacciones"));
      return (
        <Badge
          variant={"destructive"}
          className="text-xs font-medium PX.3.5 py-2.5"
        >
          {formatCurrency(amount)}
        </Badge>
      );
    },
  }, */


  {
    accessorKey: "fecha",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha y hora
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "presupuesto",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Presupuesto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {

      if (row.original.presupuesto == null) {
        return <div className="flex flex-row  items-center space-x-2">
          <div>
            No tiene presupuesto
          </div>
        </div>
      }
     return <div className="flex flex-row  items-center space-x-2">
        <div>
          {row.original.presupuesto?.categoria.nombre}
        </div>

        <Badge
          variant={"default"}
          className="text-xs font-medium p-1 rounded-md"
        >
          {formatCurrency (convertAmountFromiMiliunits(row.original.presupuesto?.monto ?? 0))}
        </Badge>
        <Badge
          variant={"secondary"}
          className="text-xs font-medium p-1 rounded-md"
        >
          {capitalizeFirstLetter(row.original.presupuesto?.periodo ?? "")}
        </Badge>
      </div>
    }
  },

  /*  {
     accessorKey: "cuentaId",
     header: ({ column }) => {
       return (
         <Button
           variant="ghost"
           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
         >
           Cuenta
           <ArrowUpDown className="ml-2 h-4 w-4" />
         </Button>
       );
     },
     cell: ({ row }) => {
       return <span>{row.original.cuenta.nombre}</span>;
     },
   }, */

  {
    id: "acciones",
    cell: ({ row }) => {
      const recordatorio = row.original;
      return <CellActions recordatorio={recordatorio} />;
    },
  },
];

/* {
   accessorKey: "createdAt",
   header: "Creado",
 },
 {
   accessorKey: "updatedAt",
   header: "Actualizado",
 },
*/