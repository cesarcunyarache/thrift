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
import { Presupuesto } from "../types/presupuesto"
import { capitalizeFirstLetter, formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { CategoryColumn } from "./category-column"
import { Periodo } from "@prisma/client"

// Componente separado para manejar las acciones de la transacción
const CellActions = ({ presupuesto }: { presupuesto: Presupuesto }) => {
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
          onClick={() => router.push(`/presupuestos/${presupuesto.id}/editar`)}
        >
          Editar
        </DropdownMenuItem>
        {/* Puedes agregar más acciones si es necesario */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columnsTablePresupuestos: ColumnDef<Presupuesto>[] = [
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
  {
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
    filterFn: (row, columnId, filterValue) => {
    
      return Array.isArray(filterValue)
        ? filterValue.includes(row.getValue(columnId))
        : row.getValue(columnId) === filterValue;
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
  },
  {
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
  },
  {
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
          {formatCurrency(amount * -1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "periodo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Periodo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const cellValue = row.getValue(columnId);
      if (Array.isArray(filterValue)) {
        return filterValue.includes(cellValue);
      }
      return cellValue === filterValue;
    },
    cell: ({ row }) => {
      const periodo: Periodo = row.getValue("periodo");
      return capitalizeFirstLetter(periodo);
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
    accessorKey: "fechaInicio",
    header: "Fecha Inicio",
  },
  {
    accessorKey: "fechaFin",
    header: "Fecha Fin",
  },
  {
    id: "acciones",
    cell: ({ row }) => {
      const presupuesto = row.original;
      return <CellActions presupuesto={presupuesto} />;
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