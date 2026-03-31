// columns.ts

import { ColumnDef } from "@tanstack/react-table";
import { OrderTableItem } from "../types";

export const columns: ColumnDef<OrderTableItem>[] = [
  {
    accessorKey: "Order No.",
    header: "Order No.",
  },
  {
    accessorKey: "Order Date",
    header: "Order Date",
    cell: ({ row }) => row.getValue("Order Date") || "-",
  },
  {
    accessorKey: "Approved Date",
    header: "Approved Date",
    cell: ({ row }) => row.getValue("Approved Date") || "-",
  },
  {
    accessorKey: "Customer Name",
    header: "Customer Name",
  },
  {
    accessorKey: "Order Value",
    header: "Order Value",
  },
  {
    accessorKey: "Invoice Value",
    header: "Invoice Value",
  },
];
