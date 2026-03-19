"use client";

import { useState } from "react";
import DataTableHeader from "@/components/table-data/data-table-header";
import MyForm from "./components/filter";
import { SectionCards } from "./components/section-cards";
import { GaugePieChartCard } from "@/components/ui/PieChartWithNeedle1";
import DataTableSubHeader from "@/components/table-data/data-table-sub-header";
import { Card, CardContent } from "@/components/ui/card";
import { GlowingBarVerticalChart } from "@/components/ui/glowing-bar-vertical-chart";
import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line";
import {
  useMonthlyTrend,
  useRegionPerformance,
  useTopCustomersTable,
} from "./useCustomers";
import { SalesFilterPayload } from "./types";
import { CommonDataTable } from "@/components/table-data/common-table";
import datas from "./components/data.json";
import { performanceColumns } from "./components/columns";
import MyForm1 from "./components/filter1";
import {
  ChartSkeleton,
  TableSkeleton,
} from "@/components/ui/dashboard-skeleton";

export default function CustomerDashboard() {
  /* =========================
     STATE MANAGEMENT
  ========================= */

  // 🔹 Global filters → used for charts + table
  const [globalFilters, setGlobalFilters] = useState<SalesFilterPayload>({});

  // 🔹 Table-specific filters → pagination + table form
  const [tableFilters, setTableFilters] = useState<SalesFilterPayload>({
    page: 1,
    length: 10,
  });

  // 🔹 Year selector for charts
  const [year, setYear] = useState("2025");

  /* =========================
     CHART API CALLS
  ========================= */

  // Monthly trend (depends on global filters)
  const { data: monthlyTrend = [], isLoading: monthlyLoading } =
    useMonthlyTrend(globalFilters);

  // Region performance (depends on global filters)
  const { data, isLoading: regionLoading } =
    useRegionPerformance(globalFilters);

  // Extract chart data safely
  const chartData = data?.chartData || [];
  const regions = data?.regions || [];

  /* =========================
     MERGE FILTERS FOR TABLE API
  ========================= */

  // 🔥 Combine global + table filters
  // → Ensures table respects both filter types
  const mergedTableFilters = {
    ...globalFilters,
    ...tableFilters,
  };

  /* =========================
     TABLE API CALL
  ========================= */

  const { data: tableDataRes, isLoading } =
    useTopCustomersTable(mergedTableFilters);

  // Extract table data safely
  const tableData = tableDataRes?.tableData || [];

  // Extract pagination info from API
  const pagination = tableDataRes?.pagination;

  /* =========================
     PAGINATION HANDLERS (SERVER SIDE)
  ========================= */

  // 👉 Move to next page
  const handleNext = () => {
    if (pagination?.current_page < pagination?.total_pages) {
      setTableFilters((prev) => ({
        ...prev,
        page: pagination.current_page + 1,
      }));
    }
  };

  // 👉 Move to previous page
  const handlePrev = () => {
    if (pagination?.current_page > 1) {
      setTableFilters((prev) => ({
        ...prev,
        page: pagination.current_page - 1,
      }));
    }
  };
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col">
        {/* 1. PAGE HEADER SECTION: Standardized padding */}
        <header className="py-8 px-4">
          <DataTableHeader title="Customers Dashboard" />
        </header>

        {/* 2. TOP FILTER SECTION: Consistent bottom margin to separate from KPI */}
        <div className="px-4 mb-8">
          <Card className="shadow-sm lg:px-5">
            <MyForm
              onFilter={(f) => {
                setGlobalFilters(f);
                setTableFilters((prev) => ({
                  ...prev,
                  page: 1,
                }));
              }}
            />
          </Card>
        </div>

        {/* 3. KPI & TREND SECTION: Uses 'gap-6' for inner grid spacing and 'mb-6' for section separation */}
        <section className="grid gap-1 px-4 mb-6 grid-cols-1  lg:grid-cols-[28%_44%_28%] gap-1 items-stretch">
          <SectionCards filters={globalFilters} />

          {monthlyLoading ? (
            <ChartSkeleton />
          ) : (
            <RainbowGlowGradientLineChart
              height={300}
              title="Monthly Trend of Customers Creation"
              showYearSelector={false}
              data={monthlyTrend}
              year={"2025"}
              setYear={setYear}
            />
          )}

          <div className="flex flex-col gap-1">
            <Card className="shadow-sm md:px-8 py-1">
              <CardContent className="flex items-center justify-between text-center">
                <div className="text-md">
                  <div className="text-green-600 font-semibold text-sm">
                    12%
                  </div>
                  <span className="font-medium text-sm text-muted-foreground">
                    Customer Satisfaction
                  </span>
                </div>
                <div className="text-sm">
                  <p>
                    <span className="font-small">Current:</span>{" "}
                    <span className="text-green-600 font-semibold">83.33%</span>
                  </p>
                  <p>
                    <span className="font-small">Last:</span>{" "}
                    <span className="text-red-500 font-semibold">75.00%</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {monthlyLoading ? <ChartSkeleton /> : <GaugePieChartCard />}
          </div>
        </section>

        {/* 4. REGION CHART SECTION: Standardized SubHeader spacing */}
        <section className="px-4 mb-6">
          <div className="mb-4">
            <DataTableSubHeader title="Customers By Region" />
          </div>

          {regionLoading ? (
            <ChartSkeleton />
          ) : (
            <div className="grid grid-cols-1">
              <div className="h-full">
                <GlowingBarVerticalChart data={chartData} regions={regions} />
              </div>
            </div>
          )}
        </section>

        {/* 5. TABLE FILTER SECTION: Consistent with section above */}
        <section className="px-4 mb-6">
          <div className="mb-4">
            <DataTableSubHeader title="Filter Records" />
          </div>
          <Card className="shadow-sm">
            <MyForm1
              onFilter={(f) =>
                setTableFilters((prev) => ({
                  ...prev,
                  ...f,
                  page: 1, // reset page on filter change
                }))
              }
            />
          </Card>
        </section>

        {/* 6. DATA TABLE SECTION: Bottom padding to finish the page */}
        <section className="px-4 pb-12">
          <Card className="shadow-sm">
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <CommonDataTable
                columns={performanceColumns}
                data={tableData}
                headerTitle="Top Customers"
                pagination={pagination}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}
          </Card>
        </section>
      </div>
    </div>
  );
}
