"use client";

import DataTableHeader from "@/components/table-data/data-table-header";
import MyForm from "./components/filter";
import MyForm1 from "./components/filter1";
import { SectionCards } from "./components/section-cards";
import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line";
import DataTableSubHeader from "@/components/table-data/data-table-sub-header";
import { CommonDataTable } from "@/components/table-data/custom-table";
import { CommonDataTables } from "@/components/table-data/common-tables";
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
import { useEffect, useState, useCallback } from "react"; // ✅ Added useCallback
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
import { TableSkeleton } from "@/components/ui/dashboard-skeleton";

export default function Salesdashboa() {
  // 🔹 Global filters → used for charts + table
  const [globalFilters, setGlobalFilters] = useState<SalesFilterPayload>({});

  const [performanceType, setPerformanceType] = useState<"routes" | "salesmen">(
    "routes",
  );

  // ✅ FIX 1: Wrap in useCallback to prevent infinite loops in MyForm1
  const handlePerformanceTypeChange = useCallback(
    (type: "routes" | "salesmen") => {
      setPerformanceType(type);
    },
    [],
  );

  // 🔹 Table-specific filters → pagination + table form
  const [tableFilters, setTableFilters] = useState<SalesFilterPayload>({
    page: 1,
    length: 10,
  });
  const { data: regionData, isLoading: regionLoading } =
    useGrowthPerformance(globalFilters);

  // 🔹 Year selector for charts
  const [year, setYear] = useState("2026");

  /* =========================
         CHART API CALLS
      ========================= */
  // Monthly trend (depends on global filters)
  const { data: monthlyTrend = [], isLoading } = useMonthlyTrend(globalFilters);

  const { data: CompareDropSizeRevenue = [], isLoading: revenueLoading } =
    useMonthlyCompareDropSizeRevenue(globalFilters);

  const { data: CompareDropSizeVolume = [], isLoading: volumeLoading } =
    useMonthlyCompareDropSizeVolume(globalFilters);

  const { data: performance = [], isLoading: performanceLoading } =
    useRoutePerformance(globalFilters, performanceType);

  const { data: expense = [], isLoading: expenseLoading } =
    useRouteExpense(globalFilters);

  const { data: performanceGraph } = useRoutePerformanceGraph();
  const { data: expenseGraph } = useRouteExpenseGraph();

  /* =========================
      EFFICIENCY TABLE LOGIC
     ========================= */
  const {
    data: efficiencyRes,
    isLoading: efficiencyloading,
    isFetching: efficiencyFetching, // ✅ Extracted isFetching for skeletons
  } = useRouteEfficiency({
    ...globalFilters,
    ...tableFilters,
  });

  const pagination = efficiencyRes?.pagination;
  const [allData, setAllData] = useState<any[]>([]);
  const page = tableFilters.page ?? 1;

  // ✅ FIX 2: Depend directly on the API reference to prevent infinite loops
  useEffect(() => {
    const newData = efficiencyRes?.tableData;
    if (!newData) return; // Do nothing if undefined (loading)

    if (page === 1) {
      setAllData(newData);
    } else if (newData.length > 0) {
      setAllData((prev) => [...prev, ...newData]);
    }
  }, [efficiencyRes?.tableData, page]); // 🚨 Strict dependency!

  // ✅ Trigger skeletons on filters
  const isInitialLoading =
    (efficiencyloading || efficiencyFetching) && page === 1;
  const isFetchingMore = (efficiencyloading || efficiencyFetching) && page > 1;

  /* =========================
        SALES TABLE LOGIC
     ========================= */
  const {
    data: salesRes,
    isLoading: salesLoading,
    isFetching: salesFetching, // ✅ Extracted isFetching for skeletons
  } = useRouteWiseSales({
    ...globalFilters,
    ...tableFilters,
  });

  const salesPagination = salesRes?.pagination;
  const [salesAllData, setSalesAllData] = useState<any[]>([]);

  // ✅ FIX 2: Depend directly on the API reference to prevent infinite loops
  useEffect(() => {
    const newSalesData = salesRes?.tableData;
    if (!newSalesData) return; // Do nothing if undefined (loading)

    if (page === 1) {
      setSalesAllData(newSalesData);
    } else if (newSalesData.length > 0) {
      setSalesAllData((prev) => [...prev, ...newSalesData]);
    }
  }, [salesRes?.tableData, page]); // 🚨 Strict dependency!

  // ✅ Trigger skeletons on filters
  const isSalesInitialLoading = (salesLoading || salesFetching) && page === 1;
  const isSalesFetchingMore = (salesLoading || salesFetching) && page > 1;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col">
        {/* ================= HEADER ================= */}
        <header className="py-4 px-2">
          <DataTableHeader title="Route Dashboard" />
        </header>

        <div className="px-2">
          <Card className="shadow-xs lg:px-4  mb-4">
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

        <section className="grid px-2 lg:pe-6 mb-6 gap-2 grid-cols-1 lg:grid-cols-[20%_40%_40%]">
          <GrowthLines data={regionData} isLoading={regionLoading} />

          {isLoading ? (
            <TableSkeleton />
          ) : (
            <AdvancedBarChart data={monthlyTrend} />
          )}

          <div className="flex flex-col gap-2">
            <RainbowGlowGradientLineChart
              title="Drop Size by Revenue"
              height={150}
              data={CompareDropSizeRevenue}
            />

            <RainbowGlowGradientLineChart
              height={150}
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

          <Card className="shadow-xs lg:px-2">
            {/* ✅ Applied the useCallback function here */}
            <MyForm1 onTypeChange={handlePerformanceTypeChange} />
          </Card>

          <div className="grid gap-2 mt-4 grid-cols-1 lg:grid-cols-2">
            <CommonDataTable
              title="TOP PERFORMER"
              columns={routeSalesCollectionColumns}
              data={performance}
              pageSize={5}
              isFetching={performanceLoading}
            />

            {!performanceGraph ? (
              <TableSkeleton />
            ) : (
              <RainbowGlowGradientLineChart
                height={280}
                title="Monthly Route Performance"
                data={performanceGraph?.chart_data}
                xKey="label"
                yKey="y"
              />
            )}
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
              isFetching={expenseLoading}
            />
            {!expenseGraph ? (
              <TableSkeleton />
            ) : (
              <RainbowGlowGradientLineChart
                height={280}
                title="Monthly Expense by Route"
                data={expenseGraph?.chart_data}
                xKey="label"
                yKey="y"
              />
            )}
          </div>
        </section>

        {/* ================= SALES REPORT ================= */}
        <section className="px-2 mb-6">
          <div className="mb-4">
            <DataTableSubHeader title="Route Wise Sales Report" />
          </div>
          {isSalesInitialLoading ? (
            <TableSkeleton />
          ) : (
            <CommonDataTables
              columns={routeSalesColumns}
              data={salesAllData}
              pagination={salesPagination}
              isFetchingMore={isSalesFetchingMore}
              onNext={() =>
                setTableFilters((prev) => ({
                  ...prev,
                  page: (prev.page ?? 1) + 1,
                }))
              }
            />
          )}
        </section>

        {/* ================= EFFICIENCY ================= */}
        <section className="px-2 pb-12">
          <div className="mb-4">
            <DataTableSubHeader title="Route Efficiency Overview" />
          </div>

          {isInitialLoading ? (
            <TableSkeleton />
          ) : (
            <CommonDataTables
              columns={salesColumns}
              data={allData}
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
