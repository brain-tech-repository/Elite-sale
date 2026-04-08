import { ColumnDef } from "@tanstack/react-table";

export const pendingInvoiceColumns: ColumnDef<any>[] = [
  { accessorKey: "invoice_number", header: "Invoice Number" },
  { accessorKey: "invoice_date", header: "Date" },
  { accessorKey: "customer_name", header: "Customer Name" },
  { accessorKey: "net_total_amount", header: "Net Amount" },
  { accessorKey: "total_invoice_value", header: "Total Value" },
  { accessorKey: "status", header: "Status" },
];

export const stockAdjustmentsyncColumns: ColumnDef<any>[] = [
  { accessorKey: "stock_adjustment_number", header: "Adjustment No" },
  { accessorKey: "journal_entry_code", header: "Journal Code" },
  { accessorKey: "stock_adjust_date", header: "Date" },
  { accessorKey: "remark", header: "Remark" },
  {
    accessorKey: "efris_error",
    header: "Error Status",
    cell: ({ row }) => (row.original.efris_error === "1" ? "Error" : "Clean"),
  },
];

export const stockAdjustmentColumns: ColumnDef<any>[] = [
  { accessorKey: "stock_adjustment_number", header: "Adjustment No" },
  { accessorKey: "journal_entry_code", header: "Journal Code" },
  { accessorKey: "stock_adjust_date", header: "Date" },
  { accessorKey: "remark", header: "Remark" },
  {
    accessorKey: "pi_count_no",
    header: "PI Count No",
  },
  {
    accessorKey: "efris_posted",
    header: "EFRIS Status",
    cell: ({ row }) =>
      row.original.efris_posted === "1" ? "Posted" : "Pending",
  },
];

export const syncRouteInvoiceColumns: ColumnDef<any>[] = [
  {
    accessorKey: "invoice_number",
    header: "Invoice No",
  },
  {
    accessorKey: "invoice_date",
    header: "Date",
  },
  {
    accessorKey: "customer_name",
    header: "Customer",
  },
  {
    accessorKey: "total_invoice_value",
    header: "Total",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
