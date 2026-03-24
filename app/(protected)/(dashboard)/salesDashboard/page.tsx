"use client";
import React from "react";
/* UI COMPONENTS */
import DataTableHeader from "@/components/table-data/data-table-header";
import DataTableSubHeader from "@/components/table-data/data-table-sub-header";
import { CommonDataTable } from "@/components/table-data/custom-table";
import { Card } from "@/components/ui/card";
import { RoundedPieChart } from "@/components/ui/rounded-pie-chart";
import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line";
import { AnimatedHighlightedAreaChart } from "@/components/ui/animated-highlighted-chart";
/* SKELETON */
import {
  ChartSkeleton,
  TableSkeleton,
} from "@/components/ui/dashboard-skeleton";
/* LOCAL */
import MyForm from "./components/filter";
import { SectionCards } from "./components/section-cards";
import { performanceColumns } from "./components/columns";
/* API */
import {
  useBrandLinePerformance,
  useBrandPerformance,
  useCustomerLinePerformance,
  useCustomerSegmentPerformance,
  useMaterialGroupPerformance,
  useMaterialLinePerformance,
  useMonthlySalesTrend,
  useRegionLinePerformance,
  useRegionPerformance,
  useYearlySalesTrend,
} from "./useSales";

import { fallbackTableData } from "./components/data/fallback";
// import { GaugeChart } from "@/components/ui/PieChartWithNeedle";
import { GaugePieChartCard } from "@/components/ui/PieChartWithNeedle";
export default function Salesdashboa() {
  const [filters, setFilters] = React.useState<any>(null);
  const [year, setYear] = React.useState("2025");
  // Ensure this matches the string format your API/chart expects (e.g., "January")
  const [selectedMonth, setSelectedMonth] = React.useState<string | null>(
    "January",
  );
  /* SALES TREND */
  const { data: monthlyData = [], isLoading: monthlyLoading } =
    useMonthlySalesTrend(year, selectedMonth, filters);

  const { data: yearlyData = [], isLoading: yearlyLoading } =
    useYearlySalesTrend(year, filters);

  /* PERFORMANCE */

  const { data: regionPerformance = [], isLoading: regionLoading } =
    useRegionPerformance(filters);

  const { data: brandPerformance = [], isLoading: brandLoading } =
    useBrandPerformance(filters);

  const { data: materialGroupPerformance = [], isLoading: materialLoading } =
    useMaterialGroupPerformance(filters);

  const { data: customerSegmentPerformance = [], isLoading: customerLoading } =
    useCustomerSegmentPerformance(filters);

  const { data: regionLineData } = useRegionLinePerformance();
  const { data: brandLineData } = useBrandLinePerformance();
  const { data: materialLineData } = useMaterialLinePerformance();
  const { data: customerLineData } = useCustomerLinePerformance();

  /* DATA TRANSFORM */

  const regionTable = regionPerformance?.Result?.table_data?.length
    ? regionPerformance.Result.table_data
    : fallbackTableData;

  const regionPie = regionPerformance?.Result?.pie_chart ?? [];
  const regionLine =
    regionLineData?.Result?.line_chart?.map((item: any) => ({
      month: item.label,
      desktop: item.y,
    })) ?? [];

  const brandTable = brandPerformance?.Result?.table_data?.length
    ? brandPerformance.Result.table_data
    : fallbackTableData;

  const brandPie = brandPerformance?.Result?.pie_chart ?? [];

  const brandLine =
    brandLineData?.Result?.line_chart?.map((item: any) => ({
      month: item.label,
      desktop: item.y,
    })) ?? [];

  const materialTable = materialGroupPerformance?.Result?.table_data?.length
    ? materialGroupPerformance.Result.table_data
    : fallbackTableData;

  const materialPie = materialGroupPerformance?.Result?.pie_chart ?? [];

  const materialLine =
    materialLineData?.Result?.line_chart?.map((item: any) => ({
      month: item.label,
      desktop: item.y,
    })) ?? [];

  const customerTable = customerSegmentPerformance?.Result?.table_data?.length
    ? customerSegmentPerformance.Result.table_data
    : fallbackTableData;

  const customerPie = customerSegmentPerformance?.Result?.pie_chart ?? [];

  const customerLine =
    customerLineData?.Result?.line_chart?.map((item: any) => ({
      month: item.label,
      desktop: item.y,
    })) ?? [];
  const formattedData = (monthlyData || []).map((item: any) => ({
    month: item.month ?? "",
    pv: Number(item.desktop ?? 0),
    uv: Number(item.desktop ?? 0),
  }));

  return (
    <div className="flex flex-1 flex-col  lg:px-2 py-4">
      <div className="flex flex-col space-y-4">
        {/* HEADER */}
        <DataTableHeader title="Sales Dashboard" />

        {/* FILTER */}
        <Card className="shadow-sm p-4">
          <MyForm onFilter={setFilters} />
        </Card>

        {/* KPI CARDS */}
        <SectionCards filters={filters} />

        {/* TOP CHARTS */}
        <section className="grid grid-cols-1   lg:grid-cols-[38%_38%_24%] gap-1 items-stretch">
          {yearlyLoading ? (
            <ChartSkeleton />
          ) : (
            <div>
              <RainbowGlowGradientLineChart
                height={220}
                title="Sales By Yearly Trends"
                description={`Sales overview for ${year}`}
                data={yearlyData}
                year={year}
                setYear={setYear}
              />
            </div>
          )}

          {monthlyLoading ? (
            <ChartSkeleton />
          ) : (
            <div>
              <AnimatedHighlightedAreaChart
                height={220}
                title="Sales By Monthly Trends"
                data={monthlyData}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
              />
            </div>
          )}

          <div>
            <GaugePieChartCard />
          </div>
        </section>

        {/* REGION */}
        <section>
          <DataTableSubHeader title="Region Performance" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mt-4">
            <>
              {/* TABLE */}
              {regionLoading ? (
                <TableSkeleton />
              ) : (
                <CommonDataTable
                  columns={performanceColumns}
                  data={regionTable}
                  pageSize={5}
                  title="Region Performance"
                />
              )}

              {/* PIE */}
              {regionLoading ? (
                <ChartSkeleton />
              ) : (
                <RoundedPieChart
                  title="Sales By Region Contribution"
                  data={regionPie}
                />
              )}

              {/* LINE → ALWAYS SHOW (NO loading) */}
              {regionLineData ? (
                <RainbowGlowGradientLineChart
                  title="Region Monthly Sales Trend"
                  data={regionLine}
                  showYearSelector={false}
                />
              ) : (
                <ChartSkeleton />
              )}
            </>
          </div>
        </section>

        {/* BRAND */}
        <section>
          <DataTableSubHeader title="Brand Performance" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 ">
            <>
              {/* TABLE */}
              {brandLoading ? (
                <TableSkeleton />
              ) : (
                <CommonDataTable
                  columns={performanceColumns}
                  data={brandTable}
                  pageSize={5}
                  title="Brand Performance"
                />
              )}

              {/* PIE */}
              {brandLoading ? (
                <ChartSkeleton />
              ) : (
                <RoundedPieChart
                  title="Sales By Brand Contribution"
                  data={brandPie}
                />
              )}

              {/* LINE */}
              {brandLineData ? (
                <RainbowGlowGradientLineChart
                  title="Brand Monthly Sales Trend"
                  data={brandLine}
                  showYearSelector={false}
                />
              ) : (
                <ChartSkeleton />
              )}
            </>
          </div>
        </section>

        {/* MATERIAL */}
        <section>
          <DataTableSubHeader title="Material Group" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mt-4">
            <>
              {/* TABLE */}
              {materialLoading ? (
                <TableSkeleton />
              ) : (
                <CommonDataTable
                  columns={performanceColumns}
                  data={materialTable}
                  pageSize={5}
                  title="Material Group"
                />
              )}

              {/* PIE */}
              {materialLoading ? (
                <ChartSkeleton />
              ) : (
                <RoundedPieChart
                  title="Sales By Material Group Contribution"
                  data={materialPie}
                />
              )}

              {/* LINE */}
              {materialLineData ? (
                <RainbowGlowGradientLineChart
                  title="Material Group Monthly Sales Trend"
                  data={materialLine}
                  showYearSelector={false}
                />
              ) : (
                <ChartSkeleton />
              )}
            </>
          </div>
        </section>

        {/* CUSTOMER */}
        <section>
          <DataTableSubHeader title="Customer Segment Performance" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mt-4">
            <>
              {/* TABLE */}
              {customerLoading ? (
                <TableSkeleton />
              ) : (
                <CommonDataTable
                  columns={performanceColumns}
                  data={customerTable}
                  pageSize={5}
                  title="Customer Segment"
                />
              )}

              {/* PIE */}
              {customerLoading ? (
                <ChartSkeleton />
              ) : (
                <RoundedPieChart
                  title="Sales By Customer Segment Contribution"
                  data={customerPie}
                />
              )}

              {/* LINE */}
              {customerLineData ? (
                <RainbowGlowGradientLineChart
                  title="Customer Segment Monthly Sales Trend"
                  data={customerLine}
                  showYearSelector={false}
                />
              ) : (
                <ChartSkeleton />
              )}
            </>
          </div>
        </section>
      </div>
    </div>
  );
}
