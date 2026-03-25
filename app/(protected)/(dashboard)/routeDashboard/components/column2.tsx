"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RouteExpense } from "../types";
import { formatCurrency } from "@/lib/firmate-currency";

export const routeExpenseColumns: ColumnDef<RouteExpense>[] = [
  {
    accessorKey: "route",
    header: "Route",
  },
  {
    accessorKey: "totalExpense",
    header: "Total Expense",
    cell: ({ row }) => (
      <span className="text-sky-600 font-medium">
        {formatCurrency(row.original.totalExpense)}
      </span>
    ),
  },
];
