"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RouteExpense } from "../types";

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
        ₹{row.original.totalExpense.toLocaleString()}
      </span>
    ),
  },
];
