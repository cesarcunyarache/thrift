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

export type CuentasColumn = {
  id: string
  plaidId: string
  nombre: string
  userId: string
  createdAt: string
  updatedAt: string
}

// Componente separado para manejar las acciones de cada cuenta
const CellActions = ({ cuenta }: { cuenta: CuentasColumn }) => {
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
          onClick={() => router.push(`/cuentas/${cuenta.id}/editar`)}
        >
          Editar
        </DropdownMenuItem>
        {/* Puedes agregar más acciones si es necesario */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columnsTableCuentas: ColumnDef<CuentasColumn>[] = [
  {
    accessorKey: "nombre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "acciones",
    cell: ({ row }) => {
      const cuenta = row.original;
      return <CellActions cuenta={cuenta} />;
    },
  },
];