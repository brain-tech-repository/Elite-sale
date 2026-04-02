"use client";

import DataTableHeader from "@/components/table-data/data-table-header";
import MyForm from "./components/filter";
import { SectionCards } from "./components/section-cards";
import { GaugePieChartCard } from "@/components/ui/PieChartWithNeedle2";
import { Card } from "@/components/ui/card";
import { CommonDataTables } from "@/components/table-data/common-tables";
import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line";

import { useEffect, useState, useMemo } from "react";

import { OrderSummaryFilters } from "./types";
import { useOrderChart, useOrderTable } from "./useOrder";
import { ColumnDef } from "@tanstack/react-table";
import {
  ChartSkeleton,
  TableSkeleton,
} from "@/components/ui/dashboard-skeleton";
import { SectionCardsSkeleton } from "@/components/ui/SectionCardsSkeleton";

export const generateColumns = (headers: string[]): ColumnDef<any>[] => {
  return headers.map((header) => ({
    accessorKey: header,
    header: header,
    cell: ({ row }: any) => row.getValue(header) || "-",
  }));
};

export default function Salesdashboa() {
  /* ================= GLOBAL FILTERS ================= */
  const today = new Date().toISOString().split("T")[0];

  const [globalFilters, setGlobalFilters] = useState<OrderSummaryFilters>({
    order_type: "1",
    from_date: today,
    to_date: today,
  });

  /* ================= TABLE FILTERS ================= */
  const [tableFilters, setTableFilters] = useState({
    page: 1,
    per_page: 10,
  });

  const [cardType, setCardType] = useState<string>("order");

  /* ================= MANUAL LOADING ================= */
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  /* ================= API ================= */
  const { data, isLoading, isFetching } = useOrderTable({
    ...globalFilters,
    ...tableFilters,
    card_type: cardType,
  });

  const { data: chartRes, isLoading: chartLoading } = useOrderChart({
    order_type: globalFilters?.order_type,
    card_type: cardType,
  });

  /* ================= DERIVED STATES ================= */
  const page = tableFilters.page ?? 1;
  const isInitialLoading = isLoading && page === 1;
  const isPageLoading =
    isFilterLoading || isInitialLoading || (isFetching && page === 1);
  const isFetchingMore = isFetching && page > 1;

  /* ================= TABLE DATA ================= */
  const [allData, setAllData] = useState<any[]>([]);

  // ✅ FIX 1: Create a state to cache headers so they don't disappear on pagination
  const [savedHeaders, setSavedHeaders] = useState<string[]>([]);

  const tableData = data?.data;
  const pagination = data?.pagination;
  const volumeChartData = chartRes?.data || [];

  /* ================= STOP FILTER LOADING ================= */
  useEffect(() => {
    if (!isLoading && !isFetching && !chartLoading) {
      setIsFilterLoading(false);
    }
  }, [isLoading, isFetching, chartLoading]);

  /* ================= ACCUMULATE TABLE DATA ================= */
  useEffect(() => {
    if (!tableData) return;

    setAllData((prev) => {
      if (page === 1) return tableData;
      return [...prev, ...tableData];
    });
  }, [tableData, page]);

  /* ================= CACHE HEADERS ================= */
  // ✅ FIX 2: Save headers whenever they exist. This prevents the table from unmounting.
  useEffect(() => {
    if (Array.isArray(data?.headers) && data.headers.length > 0) {
      setSavedHeaders(data.headers);
    }
  }, [data?.headers]);

  /* ================= SKELETON BOX ================= */
  const SkeletonBox = ({ height }: { height: number }) => (
    <div
      className="w-full bg-gray-200 animate-pulse rounded-xl"
      style={{ height }}
    />
  );

  /* ================= STATIC CHART ================= */
  const mainChartData = [
    { label: "Jan", y: 120 },
    { label: "Feb", y: 200 },
    { label: "Mar", y: 150 },
    { label: "Apr", y: 278 },
    { label: "May", y: 189 },
    { label: "Jun", y: 239 },
  ];

  // ✅ FIX 3: Base your columns on `savedHeaders`, not `data?.headers` directly.
  const dynamicColumns = useMemo(() => {
    return savedHeaders.length > 0 ? generateColumns(savedHeaders) : [];
  }, [savedHeaders]);

  const safeData = Array.isArray(allData) ? allData : [];

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col">
        {/* ================= HEADER ================= */}
        <div className="py-6 px-6">
          <DataTableHeader title="Orders Dashboard" />
        </div>

        {/* ================= FILTER ================= */}
        <div className="lg:px-6 px-1 pb-4">
          <Card className="shadow-xm lg:px-5">
            <MyForm
              onApply={(filters) => {
                setIsFilterLoading(true);
                setGlobalFilters(filters);
                setTableFilters({
                  page: 1,
                  per_page: 10,
                });
                setCardType("order");
                setAllData([]);

                // ✅ FIX 4: Clear the cached headers on new filter so it forces a clean rebuild
                setSavedHeaders([]);
              }}
            />
          </Card>
        </div>

        {/* ================= TOP SECTION ================= */}
        <section className="grid gap-2 lg:px-5 px-1 pb-8 grid-cols-1 lg:grid-cols-[30%_40%_30%]">
          {/* CARDS */}
          {isFilterLoading ? (
            <SectionCardsSkeleton />
          ) : (
            <SectionCards
              filters={globalFilters}
              onCardClick={(type) => {
                setCardType(type);
                setTableFilters((prev) => ({ ...prev, page: 1 }));
                setAllData([]);
              }}
            />
          )}

          {/* MAIN CHART */}
          {isPageLoading ? (
            <ChartSkeleton />
          ) : (
            <RainbowGlowGradientLineChart
              height={350}
              title="Drop Size by Volume"
              data={volumeChartData}
              xKey="label"
              yKey="y"
            />
          )}

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-2">
            {isPageLoading ? (
              <SkeletonBox height={150} />
            ) : (
              <GaugePieChartCard />
            )}

            {isPageLoading ? (
              <SkeletonBox height={150} />
            ) : (
              <RainbowGlowGradientLineChart
                height={150}
                title="Drop Size by Volume"
                data={mainChartData}
                xKey="label"
                yKey="y"
              />
            )}
          </div>
        </section>

        {/* ================= TABLE ================= */}
        <section className="lg:px-6 px-1 space-y-4">
          {isPageLoading && page === 1 ? (
            <TableSkeleton />
          ) : dynamicColumns.length > 0 ? (
            <CommonDataTables
              columns={dynamicColumns}
              data={safeData}
              headerTitle="Top Customers"
              pagination={pagination}
              isFetchingMore={isFetchingMore}
              onNext={() =>
                setTableFilters((prev) => ({
                  ...prev,
                  page: (prev.page ?? 1) + 1,
                }))
              }
            />
          ) : null}
        </section>
      </div>
    </div>
  );
}
