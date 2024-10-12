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
import { Transaccion } from "../types/transaccion"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// Componente separado para manejar las acciones de la transacción
const CellActions = ({ transaccion }: { transaccion: Transaccion }) => {
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
          onClick={() => router.push(`/transacciones/${transaccion.id}/editar`)}
        >
          Editar
        </DropdownMenuItem>
        {/* Puedes agregar más acciones si es necesario */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columnsTableTransacciones: ColumnDef<Transaccion>[] = [
  {
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
  },
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
    cell: ({ row }) => {
      return <span>{row.original.categoria?.nombre ?? "Indefinido"}</span>;
    },
  },
  {
    accessorKey: "beneficiario",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Beneficiario
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "monto",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Monto
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
  },
  {
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
  },
  {
    id: "acciones",
    cell: ({ row }) => {
      const transaccion = row.original;
      return <CellActions transaccion={transaccion} />;
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