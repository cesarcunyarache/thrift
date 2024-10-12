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

export type CategoriasColumn = {
  id: string
  nombre: string
  userId: string
  createdAt: string
  updatedAt: string
}

// Crear un componente separado para manejar las acciones de la categoría
const CellActions = ({ categoria }: { categoria: CategoriasColumn }) => {
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
          onClick={() => router.push(`/categorias/${categoria.id}/editar`)}
        >
          Editar
        </DropdownMenuItem>
        {/* Puedes agregar más acciones si es necesario */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columnsTableCategorias: ColumnDef<CategoriasColumn>[] = [
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
      )
    },
  },
  {
    id: "acciones",
    cell: ({ row }) => {
      const categoria = row.original;
      return <CellActions categoria={categoria} />;
    },
  },
];