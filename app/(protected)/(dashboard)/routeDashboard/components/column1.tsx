"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RouteSalesCollection } from "../types"; // ✅ FIX
import { formatCurrency } from "@/lib/firmate-currency";

export const routeSalesCollectionColumns: ColumnDef<RouteSalesCollection>[] = [
  {
    accessorKey: "route",
    header: "Route",
  },
  {
    accessorKey: "totalSales",
    header: "Total Sales",
    cell: ({ row }) => (
      <span className="text-emerald-600 font-medium">
        {formatCurrency(row.original.totalSales)}
      </span>
    ),
  },
  {
    accessorKey: "totalCollection",
    header: "Total Collection",
    cell: ({ row }) => (
      <span className="text-blue-600 font-medium">
        {formatCurrency(row.original.totalCollection)}
      </span>
    ),
  },
];
