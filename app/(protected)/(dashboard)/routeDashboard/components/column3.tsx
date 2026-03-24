"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RouteSalesCollection } from "../types";

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
        ₹{row.original.totalSales.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "totalCollection",
    header: "Total Collection",
    cell: ({ row }) => (
      <span className="text-blue-600 font-medium">
        ₹{row.original.totalCollection.toLocaleString()}
      </span>
    ),
  },
];
