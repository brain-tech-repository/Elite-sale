"use client";
import DataTableHeader from "@/components/table-data/data-table-header";
import MyForm from "./components/filter";
import { SectionCards } from "./components/section-cards";
import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line";
import DataTableSubHeader from "@/components/table-data/data-table-sub-header";
import { CommonDataTable } from "@/components/table-data/custom-table";
import { CommonDataTables } from "@/components/table-data/common-tables";
import { salesColumns } from "./components/columns";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { AnimatedHighlightedAreaChart } from "@/components/ui/animated-highlighted-chart";
import {
  useActiveSkus,
  useInactiveSkus,
  useMaterialPerformance,
  useTopMaterialByValue,
  useTopMaterialByVolume,
  useValueGrowthChart,
  useVolumeGrowthChart,
} from "./useMaterial";
import { SalesFilterPayload } from "./types";
import { skuColumns } from "./components/columns1";
import { ChartSkeleton } from "@/components/ui/dashboard-skeleton";
import GradientBarChart from "@/components/ui/BarChart";
type Sale = {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: "Completed" | "Pending" | "Cancelled";
  date: string;
};
export default function Salesdashboa() {
  const [filters, setFilters] = React.useState<SalesFilterPayload>({});

  const [tableFilters, setTableFilters] = useState({
    page: 1,
    length: 10,
  });

  /* =========================
     API CALL
  ========================= */

  const { data: materialRes, isLoading } = useMaterialPerformance(
    filters,
    tableFilters.page,
    tableFilters.length,
  );

  const materialData = materialRes?.tableData ?? [];
  const pagination = materialRes?.pagination;

  /* =========================
     APPEND DATA (IMPORTANT)
  ========================= */

  const [allData, setAllData] = useState<any[]>([]);

  useEffect(() => {
    if (materialData.length) {
      setAllData((prev) =>
        tableFilters.page === 1 ? materialData : [...prev, ...materialData],
      );
    }
  }, [materialData]);

  /* =========================
     LOADING STATES
  ========================= */

  const page = tableFilters.page ?? 1;

  const isInitialLoading = isLoading && page === 1;
  const isFetchingMore = isLoading && page > 1;

  const { data: activeSkus = [], isLoading: activeLoading } =
    useActiveSkus(filters);

  const { data: inactiveSkus = [], isLoading: inactiveLoading } =
    useInactiveSkus(filters);

  const {
    data: volumeGrowth = { daily: [], monthly: [], yearly: [] },
    isLoading: volumeLoading,
  } = useVolumeGrowthChart(filters);

  const {
    data: valueGrowth = { daily: [], monthly: [], yearly: [] },
    isLoading: valueLoading,
  } = useValueGrowthChart(filters);

  // nxcjdnjkdnb  hd
  const { data: topVolume = [], isLoading: volumesLoading } =
    useTopMaterialByVolume(filters);

  const { data: topValue = [], isLoading: valuesLoading } =
    useTopMaterialByValue(filters);

  const formatChartData = (arr: any[]) =>
    arr.map((item) => ({
      name: item.label,
      value: item.y,
    }));
  // const materialOptions = active.map((item: any) => ({
  //   value: item.material_code,
  //   label: item.material_description,
  // }));

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col">
          {/* PAGE HEADER */}
          <div className=" py-6 px-6">
            <DataTableHeader title="Material Dashboard" />
          </div>
          {/* FILTERS */}
          <div className="lg:px-6 px-1 pb-4">
            <Card className="shadow-xm">
              {" "}
              <MyForm onFilter={setFilters} />
            </Card>
          </div>
          {/* KPI CARDS */}
          <div className="lg:px-6 px-1 pb-6">
            <SectionCards filters={filters} />
          </div>
          {/* TOP CHARTS */}
          {/* SECTION 2 */}
          <div className="lg:px-6 px-1 pb-8">
            <section className="grid gap-2 mt-4 grid-cols-1 lg:grid-cols-2">
              {/* Table 1 */}
              <div className="lg:col-span-1 space-y-2">
                <DataTableSubHeader
                  title="Top Material By Volume
"
                />
                {volumeLoading ? (
                  <ChartSkeleton />
                ) : (
                  <GradientBarChart
                    data={topVolume}
                    xKey="label"
                    yKey="y"
                    title="Top Volume"
                    truncateLabel={(val) =>
                      val.length > 25 ? val.slice(0, 25) + "..." : val
                    }
                  />
                )}
              </div>

              {/* Table 2 */}
              <div className="lg:col-span-1 space-y-2">
                <DataTableSubHeader title="Top Material By Value" />
                {valueLoading ? (
                  <ChartSkeleton />
                ) : (
                  <GradientBarChart
                    data={topValue}
                    xKey="label"
                    yKey="y"
                    title="Top Value"
                    truncateLabel={(val) =>
                      val.length > 25 ? val.slice(0, 25) + "..." : val
                    }
                  />
                )}
              </div>
            </section>
          </div>

          {/* SECTION 3 */}
          <div className="lg:px-6 px-1 pb-10">
            <DataTableSubHeader title="Material Performance" />
            <section className="grid gap-2 mt-4 grid-cols-1 lg:grid-cols-1">
              <div className="lg:col-span-1">
                <CommonDataTables
                  headerTitle="Material Performance"
                  columns={salesColumns}
                  data={allData} // ✅ APPENDED DATA
                  pagination={pagination}
                  isFetchingMore={isFetchingMore} // ✅ SCROLL LOADER
                  onNext={() =>
                    setTableFilters((prev) => ({
                      ...prev,
                      page: (prev.page ?? 1) + 1,
                    }))
                  }
                />
              </div>
            </section>
          </div>
          <div className="lg:px-6 px-1 pb-10">
            <DataTableSubHeader title="Material Volume Growth" />
            <section className="grid gap-2 mt-4 grid-cols-1 lg:grid-cols-3">
              <>
                {/* DAILY */}
                {volumeLoading ? (
                  <ChartSkeleton />
                ) : (
                  <RainbowGlowGradientLineChart
                    data={volumeGrowth.daily}
                    xKey="label"
                    yKey="y"
                    title="Daily"
                  />
                )}

                {/* MONTHLY */}
                {volumeLoading ? (
                  <ChartSkeleton />
                ) : (
                  <AnimatedHighlightedAreaChart
                    data={volumeGrowth.monthly}
                    xKey="label"
                    yKey="y"
                    title="Monthly"
                  />
                )}

                {/* YEARLY */}
                {volumeLoading ? (
                  <ChartSkeleton />
                ) : (
                  <RainbowGlowGradientLineChart
                    data={volumeGrowth.yearly}
                    xKey="label"
                    yKey="y"
                    title="Yearly"
                  />
                )}
              </>
            </section>
          </div>
          <div className="lg:px-6 px-1 pb-10">
            <DataTableSubHeader title="Material Volue Growth" />
            <section className="grid gap-2 mt-4 grid-cols-1 lg:grid-cols-3">
              <>
                {/* DAILY */}
                {valueLoading ? (
                  <ChartSkeleton />
                ) : (
                  <RainbowGlowGradientLineChart
                    data={valueGrowth.daily}
                    xKey="label"
                    yKey="y"
                    title="Daily"
                  />
                )}

                {/* MONTHLY */}
                {valueLoading ? (
                  <ChartSkeleton />
                ) : (
                  <AnimatedHighlightedAreaChart
                    data={valueGrowth.monthly}
                    xKey="label"
                    yKey="y"
                    title="Monthly"
                  />
                )}

                {/* YEARLY */}
                {valueLoading ? (
                  <ChartSkeleton />
                ) : (
                  <RainbowGlowGradientLineChart
                    data={valueGrowth.yearly}
                    xKey="label"
                    yKey="y"
                    title="Yearly"
                  />
                )}
              </>
            </section>
          </div>

          <section className="grid gap-2 mt-4 grid-cols-1 lg:grid-cols-2">
            {/* Table 1 */}
            <div className="lg:col-span-1 space-y-2">
              <DataTableSubHeader title="Active SKUs (Last 2 Weeks)" />
              <CommonDataTable
                columns={skuColumns}
                data={activeSkus}
                pageSize={5}
                isFetching={isLoading}
              />
            </div>
            {/* Table 2 */}
            <div className="lg:col-span-1 space-y-2">
              <DataTableSubHeader title="Inactive SKUs (Last 2 Weeks)" />
              <CommonDataTable
                columns={skuColumns}
                data={inactiveSkus}
                pageSize={5}
                isFetching={isLoading}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
