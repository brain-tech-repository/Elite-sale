"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RouteSales } from "../types";
import { formatCurrency } from "@/lib/firmate-currency";

export const routeSalesColumns: ColumnDef<RouteSales>[] = [
  {
    accessorKey: "route",
    header: "Route",
  },

  {
    accessorKey: "todaySales",
    header: "Today Sales",
    cell: ({ row }) => formatCurrency(row.original.todaySales),
  },

  {
    accessorKey: "yesterdaySales",
    header: "Yesterday Sales",
    cell: ({ row }) => formatCurrency(row.original.yesterdaySales),
  },

  {
    accessorKey: "weeklySales",
    header: "Weekly Sales",
    cell: ({ row }) => formatCurrency(row.original.weeklySales),
  },

  {
    accessorKey: "last14DaysSales",
    header: "Last 14 Days",
    cell: ({ row }) => formatCurrency(row.original.last14DaysSales),
  },

  {
    accessorKey: "monthSales",
    header: "Month",
    cell: ({ row }) => formatCurrency(row.original.monthSales),
  },

  {
    accessorKey: "quarterSales",
    header: "Quarter",
    cell: ({ row }) => formatCurrency(row.original.quarterSales),
  },

  {
    accessorKey: "yearSales",
    header: "Year",
    cell: ({ row }) => formatCurrency(row.original.yearSales),
  },
];
