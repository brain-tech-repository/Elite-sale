"use client";

import DataTableHeader from "@/components/table-data/data-table-header";
import MyForm from "./components/filter";
import MyForm1 from "./components/filter1";
import { SectionCards } from "./components/section-cards";
import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line";
import DataTableSubHeader from "@/components/table-data/data-table-sub-header";
import { CommonDataTable } from "@/components/table-data/custom-table";
import { salesColumns } from "./components/columns";
import { Card } from "@/components/ui/card";
import GrowthLines from "@/components/growthlines";
import { AdvancedBarChart } from "@/components/ui/advancebar";
import {
  RouteExpense,
  RouteSales,
  RouteSalesCollection,
  SalesFilterPayload,
} from "./types";
import { useState } from "react";
import { useRegionPerformance } from "../customerDashboard/useCustomers";
import {
  useGrowthPerformance,
  useMonthlyCompareDropSizeRevenue,
  useMonthlyCompareDropSizeVolume,
  useMonthlyTrend,
  useRouteEfficiency,
  useRouteExpense,
  useRouteExpenseGraph,
  useRoutePerformance,
  useRoutePerformanceGraph,
  useRouteWiseSales,
} from "./useRoutes";
import { routeSalesCollectionColumns } from "./components/column1";
import { routeExpenseColumns } from "./components/column2";
import { routeSalesColumns } from "./components/column3";
export default function Salesdashboa() {
  // 🔹 Global filters → used for charts + table
  const [globalFilters, setGlobalFilters] = useState<SalesFilterPayload>({});

  // 🔹 Table-specific filters → pagination + table form
  const [tableFilters, setTableFilters] = useState<SalesFilterPayload>({
    page: 1,
    length: 10,
  });
  const { data: regionData, isLoading: regionLoading } =
    useGrowthPerformance(globalFilters);
  // 🔹 Year selector for charts
  const [year, setYear] = useState("2025");
  /* =========================
         CHART API CALLS
      ========================= */
  // Monthly trend (depends on global filters)
  const { data: monthlyTrend = [], isLoading } = useMonthlyTrend(globalFilters);

  const { data: CompareDropSizeRevenue = [], isLoading: revenueLoading } =
    useMonthlyCompareDropSizeRevenue(globalFilters);

  const { data: CompareDropSizeVolume = [], isLoading: volumeLoading } =
    useMonthlyCompareDropSizeVolume(globalFilters);

  const { data: performance = [] } = useRoutePerformance(globalFilters);
  const { data: expense = [] } = useRouteExpense(globalFilters);
  const { data: sales = [] } = useRouteWiseSales(globalFilters);
  const { data: efficiency = [] } = useRouteEfficiency(globalFilters);

  const { data: performanceGraph } = useRoutePerformanceGraph();
  const { data: expenseGraph } = useRouteExpenseGraph();

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col">
        {/* ================= HEADER ================= */}
        <header className="py-8 px-2">
          <DataTableHeader title="Route Dashboard" />
        </header>

        <div className="px-2 mb-8">
          <Card className="shadow-xs lg:px-5">
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

        <section className="px-2 mb-6">
          <SectionCards filters={globalFilters} />
        </section>

        <section className="grid px-2 mb-6 gap-2 grid-cols-1 lg:grid-cols-[20%_40%_40%]">
          <GrowthLines data={regionData} isLoading={regionLoading} />

          <AdvancedBarChart data={monthlyTrend} />

          <div className="flex flex-col gap-2">
            <RainbowGlowGradientLineChart
              title="Drop Size by Revenue"
              height={150}
              showYearSelector={false}
              data={CompareDropSizeRevenue}
            />

            <RainbowGlowGradientLineChart
              height={150}
              showYearSelector={false}
              data={CompareDropSizeVolume}
              title="Drop Size by Volume"
            />
          </div>
        </section>

        {/* ================= ROUTE PERFORMANCE ================= */}
        <section className="px-2 mb-6">
          <div className="mb-4">
            <DataTableSubHeader title="Route Performance" />
          </div>

          <Card className="shadow-xs lg:px-5">
            <MyForm1 />
          </Card>

          <div className="grid gap-2 mt-4 grid-cols-1 lg:grid-cols-2">
            <CommonDataTable
              title="TOP PERFORMER"
              columns={routeSalesCollectionColumns}
              data={performance}
              pageSize={5}
            />

            <RainbowGlowGradientLineChart
              title="Monthly Route Performance"
              data={performanceGraph?.chart_data}
              xKey="label"
              yKey="y"
            />
          </div>
        </section>

        {/* ================= EXPENSE ================= */}
        <section className="px-2 mb-6">
          <div className="mb-4">
            <DataTableSubHeader title="Route Expense Analysis" />
          </div>

          <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
            <CommonDataTable
              tableWidth="100%"
              title="Expense By Route"
              columns={routeExpenseColumns}
              data={expense}
              pageSize={5}
            />

            <RainbowGlowGradientLineChart
              title="Monthly Expense by Route"
              data={expenseGraph?.chart_data}
              xKey="label"
              yKey="y"
            />
          </div>
        </section>

        {/* ================= SALES REPORT ================= */}
        <section className="px-2 mb-6">
          <div className="mb-4">
            <DataTableSubHeader title="Route Wise Sales Report" />
          </div>

          <CommonDataTable
            title="Sale By Route"
            columns={routeSalesColumns}
            data={sales}
            pageSize={5}
          />
        </section>

        {/* ================= EFFICIENCY ================= */}
        <section className="px-2 pb-12">
          <div className="mb-4">
            <DataTableSubHeader title="Route Efficiency Overview" />
          </div>

          <CommonDataTable
            tableWidth="1600px"
            title="Route Efficiency"
            columns={salesColumns}
            data={efficiency}
            pageSize={5}
          />
        </section>
      </div>
    </div>
  );
}
