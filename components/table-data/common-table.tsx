"use client";

import * as React from "react";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  // getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
} from "@tanstack/react-table";

import { DataTableSearch } from "./data-table-search";
import { DataTableColumns } from "./data-table-columns";
import { DataTablePagination } from "./data-table-pagination";
import DataTableSubHeader from "./data-table-sub-header";
import DataTableHeader from "./table-header";

interface CommonTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  headerTitle?: string;

  pagination?: any;
  onNext?: () => void;
  onPrev?: () => void;
}

export function CommonDataTable<TData, TValue>({
  headerTitle,
  columns,
  data,
  pageSize = 10,
  pagination, // ✅ server pagination
  onNext,
  onPrev,
}: CommonTableProps<TData, TValue>) {
  // const [pagination, setPagination] = React.useState({
  //   pageIndex: 0,
  //   pageSize: pageSize,
  // });

  const table = useReactTable({
    data,
    columns,
    // state: {
    //   pagination,
    // },

    // onPaginationChange: setPagination,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full flex flex-col gap-2">
      {headerTitle && <DataTableHeader title={headerTitle} />}

      {/* SEARCH */}
      <DataTableSearch table={table} />

      {/* TABLE */}
      <div className="overflow-hidden rounded-lg border">
        <DataTableColumns table={table} columnsLength={columns.length} />
      </div>

      {/* PAGINATION */}
      {pagination && onNext && onPrev && (
        <DataTablePagination
          pagination={pagination}
          onNext={onNext}
          onPrev={onPrev}
        />
      )}
    </div>
  );
}
