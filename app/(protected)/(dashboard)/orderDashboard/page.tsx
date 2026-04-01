"use client";

import DataTableHeader from "@/components/table-data/data-table-header";
import MyForm from "./components/filter";
import { SectionCards } from "./components/section-cards";
import { GaugePieChartCard } from "@/components/ui/PieChartWithNeedle2";
import { Card } from "@/components/ui/card";
import { CommonDataTables } from "@/components/table-data/common-tables";
import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line";

import { useEffect, useState } from "react";

import { OrderSummaryFilters } from "./types";
import { useOrderTable } from "./useOrder";
import { columns } from "./components/columns";
import {
  ChartSkeleton,
  TableSkeleton,
} from "@/components/ui/dashboard-skeleton";
import { SectionCardsSkeleton } from "@/components/ui/SectionCardsSkeleton";

export default function Salesdashboa() {
  /* ================= GLOBAL FILTERS ================= */
  const [globalFilters, setGlobalFilters] = useState<OrderSummaryFilters>({});

  /* ================= TABLE FILTERS ================= */
  const [tableFilters, setTableFilters] = useState({
    page: 1,
    per_page: 10,
  });

  /* ================= GLOBAL LOADING ================= */
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  const { data, isLoading, isFetching } = useOrderTable({
    ...globalFilters,
    ...tableFilters,
  });

  /* ================= TABLE DATA ================= */
  const [allData, setAllData] = useState<any[]>([]);
  const page = tableFilters.page ?? 1;

  const tableData = data?.data ?? [];
  const pagination = data?.pagination;

  const isInitialLoading = isLoading && page === 1;
  const isFetchingMore = isFetching && page > 1;

  /* ================= STOP GLOBAL LOADING ================= */
  useEffect(() => {
    if (!isLoading && !isFetching) {
      setIsFilterLoading(false);
    }
  }, [isLoading, isFetching]);

  /* ================= ACCUMULATE TABLE DATA ================= */
  useEffect(() => {
    if (tableData.length) {
      setAllData((prev) => (page === 1 ? tableData : [...prev, ...tableData]));
    }
  }, [tableData]);

  /* ================= SKELETON COMPONENT ================= */
  const SkeletonBox = ({ height }: { height: number }) => (
    <div
      className="w-full bg-gray-200 animate-pulse rounded-xl"
      style={{ height }}
    />
  );

  const mainChartData = [
    { label: "Jan", y: 120 },
    { label: "Feb", y: 200 },
    { label: "Mar", y: 150 },
    { label: "Apr", y: 278 },
    { label: "May", y: 189 },
    { label: "Jun", y: 239 },
  ];

  const volumeChartData = [
    { label: "Jan", y: 30 },
    { label: "Feb", y: 45 },
    { label: "Mar", y: 28 },
    { label: "Apr", y: 60 },
    { label: "May", y: 50 },
    { label: "Jun", y: 70 },
  ];

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
                setIsFilterLoading(true); // 🔥 start loading

                setGlobalFilters(filters);

                setTableFilters({
                  page: 1,
                  per_page: 10,
                });

                setAllData([]); // reset table
              }}
            />
          </Card>
        </div>

        {/* ================= TOP CARDS ================= */}
        <section className="grid gap-2 lg:px-5 px-1 pb-8 grid-cols-1 lg:grid-cols-[30%_40%_30%]">
          {/* Cards */}
          {isFilterLoading ? (
            <SectionCardsSkeleton />
          ) : (
            <SectionCards filters={globalFilters} />
          )}

          {/* Main Chart */}
          {isFilterLoading ? (
            <ChartSkeleton />
          ) : (
            <RainbowGlowGradientLineChart
              height={350}
              data={mainChartData}
              xKey="label"
              yKey="y"
            />
          )}

          {/* Right Section */}
          <div className="flex flex-col gap-2">
            {isFilterLoading ? (
              <SkeletonBox height={150} />
            ) : (
              <GaugePieChartCard />
            )}

            {isFilterLoading ? (
              <SkeletonBox height={150} />
            ) : (
              <RainbowGlowGradientLineChart
                height={150}
                title="Drop Size by Volume"
                data={volumeChartData}
                xKey="label"
                yKey="y"
              />
            )}
          </div>
        </section>

        {/* ================= TABLE ================= */}
        <section className="lg:px-6 px-1 space-y-4">
          {isFilterLoading && page === 1 ? (
            <TableSkeleton />
          ) : (
            <CommonDataTables
              columns={columns}
              data={allData}
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
          )}
        </section>
      </div>
    </div>
  );
}
