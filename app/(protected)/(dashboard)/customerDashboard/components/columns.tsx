import { ColumnDef } from "@tanstack/react-table";

export type PerformanceRow = {
  serial_no: number;
  date: string;
  customer_code: string;
  customer_name: string;
  customer_category_name: string;
  last_transaction: string;
  total_collection: string;
  total_invoice_value: string;
  amount: string;
  total_invoice_amount: string;
  per_day: string;
};

export const performanceColumns: ColumnDef<PerformanceRow>[] = [
  {
    accessorKey: "serial_no",
    header: "S. No.",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "customer_code",
    header: "Customer Code",
  },
  {
    accessorKey: "customer_name",
    header: "Customer Name",
  },
  {
    accessorKey: "customer_category_name",
    header: "Customer Segment",
  },
  {
    accessorKey: "last_transaction",
    header: "Last Transaction",
  },
  {
    accessorKey: "total_collection",
    header: "Total Collection",
  },
  {
    accessorKey: "total_invoice_value",
    header: "Total Invoice Value",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "total_invoice_amount",
    header: "Total Invoice Amount",
  },
  {
    accessorKey: "per_day",
    header: "Per Day",
  },
];
