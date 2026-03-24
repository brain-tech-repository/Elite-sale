"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Sale } from "../types";

export const salesColumns: ColumnDef<Sale>[] = [
  { accessorKey: "sno", header: "S. No." },
  { accessorKey: "route", header: "Route" },
  { accessorKey: "warehouse", header: "Warehouse" },
  { accessorKey: "salesman", header: "Salesman" },

  { accessorKey: "totalCustomer", header: "Total Customer" },
  { accessorKey: "totalVisitDays", header: "Total Visit Days" },
  { accessorKey: "plannedVisit", header: "Planned Visit" },
  // { accessorKey: "unplannedVisit", header: "Unplanned Visit" },

  {
    accessorKey: "dropRate",
    header: "Drop Rate %",
    cell: ({ row }) => (
      <span className="text-blue-600 font-medium">
        {row.original.dropRate}%
      </span>
    ),
  },

  // { accessorKey: "avgTimeSpend", header: "Avg. Time Spend / Outlet" },
  // { accessorKey: "totalInvoice", header: "Total Invoice No." },
  // { accessorKey: "avgInvoicePerDay", header: "Avg. Invoice / Day" },

  {
    accessorKey: "salesValue",
    header: "Sales (₹)",
    cell: ({ row }) => (
      <span className="text-emerald-600 font-medium">
        ₹{row.original.salesValue.toLocaleString()}
      </span>
    ),
  },

  { accessorKey: "salesPerDay", header: "Sales / Day" },

  {
    accessorKey: "totalCollection",
    header: "Total Collection",
    cell: ({ row }) => (
      <span className="text-green-600 font-medium">
        ₹{row.original.totalCollection.toLocaleString()}
      </span>
    ),
  },

  { accessorKey: "collectionPerDay", header: "Collection / Day" },

  {
    accessorKey: "pendingCollection",
    header: "Pending Collection",
    cell: ({ row }) => (
      <span className="text-red-600 font-medium">
        ₹{row.original.pendingCollection.toLocaleString()}
      </span>
    ),
  },
];
