import { ColumnDef } from "@tanstack/react-table"

export type PerformanceRow = {
  id: number
  name: string
  total_sales: number
  total_collection: number
  total_return: number
}

export const performanceColumns: ColumnDef<PerformanceRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "total_sales",
    header: "Total Sales",
  },
  {
    accessorKey: "total_collection",
    header: "Collection",
  },
  {
    accessorKey: "total_return",
    header: "Return",
  },
]