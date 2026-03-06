"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

import {
  IconLayoutColumns,
  IconChevronDown,
  IconPlus,
} from "@tabler/icons-react"

interface DataTableSearchProps<TData> {
  table: Table<TData>
}

export function DataTableSearch<TData>({
  table,
}: DataTableSearchProps<TData>) {
  return (
    <div className="flex items-center justify-between px-4 lg:px-6 gap-4">

      <Input
        placeholder="Search sections..."
        value={(table.getColumn("header")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("header")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />

      <div className="flex items-center gap-2">

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <IconLayoutColumns />
              <span className="hidden lg:inline">Customize Columns</span>
              <span className="lg:hidden">Columns</span>
              <IconChevronDown />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide()
              )
              .map((column) => (
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
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        
      </div>
    </div>
  )
}