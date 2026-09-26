"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  VisibilityState,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "./ui/button"
import React, { useEffect } from "react"
import { Input } from "./ui/input"




import { CheckIcon, Loader2 } from "lucide-react"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableFacetedFilter, Option } from "./data-table-faceted-filter"
import { DateFilter } from "./date-filter"
import { AccountFilter } from "./account-filter"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
/* import { ta } from "date-fns/locale" */

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterKey: string
  isLoading: boolean
  floatingBar?: React.ReactNode
  filterCategories: Option[]
}

export function DataTableTransacciones<TData, TValue>({
  columns,
  data,
  filterKey,
  isLoading,
  floatingBar = null,
  filterCategories
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = React.useState<SortingState>([])

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  useEffect(() => {
    table.setPageSize(5);


  }, [table]);


  console.log("Column filters:", columnFilters);

  return (
    <div>
      <div>
        <div className="flex pt-4 pb-2 lg:flex-row flex-col gap-2">
          <div className="space-x-2 flex">
            <Input
              placeholder={`Filtrar por ${filterKey}...`}
              value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn(filterKey)?.setFilterValue(event.target.value)
              }
              className="lg:w-72"
            />

          </div>

          {/*  <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columnas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(
                  (column) => column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu> */}

          <Popover >
            <PopoverTrigger asChild>
              <Button
                aria-label="Toggle columns"
                variant="outline"
                size="sm"
                className="ml-auto w-full lg:w-40 h-9 lg:flex px-6"
              >
                <MixerHorizontalIcon className="mr-2 size-4" />
                Columnas
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-40 p-0">
              <Command>
                <CommandInput placeholder="Columnas" />
                <CommandList>
                  <CommandEmpty>No hay columnas</CommandEmpty>
                  <CommandGroup>
                  {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" && column.getCanHide()
                )
                .map((column) => {
                  const isVisible = column.getIsVisible()
                  return (
                    <CommandItem
                      key={column.id}
                      className="capitalize flex justify-between items-center"
                      onSelect={() => column.toggleVisibility()}
                    >
                      <span className="truncate">{column.id}</span>
                      {isVisible && <CheckIcon className="ml-2 h-4 w-4 text-primary" />}
                    </CommandItem>
                  )
                })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center flex-col  pb-4 lg:flex-row gap-2">
          <div className="lg:w-72 w-full">
            <DateFilter />
          </div>
          <AccountFilter />
          <div className="w-full lg:w-auto">
            <DataTableFacetedFilter
              key={String("categoriaId")}
              column={table.getColumn("categoriaId")}
              title="Categoría"
              options={filterCategories}
            />
          </div>

        </div>

      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="h-24 w-full text-center">
                  <div className="flex justify-center items-center">
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) :
              table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No hay registros.
                  </TableCell>
                </TableRow>
              )}

          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-2.5 py-4">
        <DataTablePagination totalRows={data.length} table={table} />
        {table.getFilteredSelectedRowModel().rows.length > 0 && floatingBar}
      </div>
    </div>
  )
}

