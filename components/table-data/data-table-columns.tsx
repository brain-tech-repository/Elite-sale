"use client"

import { Table } from "@tanstack/react-table"
import {
  Table as UITable,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table"

import { flexRender } from "@tanstack/react-table"

interface DataTableColumnsProps<TData> {
  table: Table<TData>
  columnsLength: number
}

export function DataTableColumns<TData>({
  table,
  columnsLength,
}: DataTableColumnsProps<TData>) {
  return (
    <UITable>

      <TableHeader className="sticky top-0 z-10 bg-muted ">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>

            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} colSpan={header.colSpan}>

                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

              </TableHead>
            ))}

          </TableRow>
        ))}
      </TableHeader>

      <TableBody>

        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>

              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}

            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columnsLength}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}

      </TableBody>
    </UITable>
  )
}