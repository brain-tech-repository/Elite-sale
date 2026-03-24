"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RouteSales } from "../types";

export const routeSalesColumns: ColumnDef<RouteSales>[] = [
  {
    accessorKey: "route",
    header: "Route",
  },

  {
    accessorKey: "todaySales",
    header: "Today Sales",
    cell: ({ row }) => (
      <span className="text-emerald-600 font-medium">
        ₹{row.original.todaySales.toLocaleString()}
      </span>
    ),
  },

  {
    accessorKey: "yesterdaySales",
    header: "Yesterday Sales",
    cell: ({ row }) => (
      <span className="text-gray-700">
        ₹{row.original.yesterdaySales.toLocaleString()}
      </span>
    ),
  },

  {
    accessorKey: "weeklySales",
    header: "Weekly Sales",
  },

  {
    accessorKey: "last14DaysSales",
    header: "Last 14 Days Sales",
  },

  {
    accessorKey: "monthSales",
    header: "Month Sales",
  },

  {
    accessorKey: "quarterSales",
    header: "Quarter Sales",
  },

  {
    accessorKey: "yearSales",
    header: "Year Sales",
  },
];
