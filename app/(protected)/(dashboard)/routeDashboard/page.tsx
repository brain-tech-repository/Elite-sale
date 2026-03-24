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
} from "./useRoutes";
import { routeSalesColumns } from "./components/column1";
import { routeExpenseColumns } from "./components/column2";
import { routeSalesCollectionColumns } from "./components/column3";

export type Sale = {
  sno: number;
  route: string;
  warehouse: string;
  salesman: string;
  totalCustomer: number;
  totalVisitDays: number;
  plannedVisit: number;
  unplannedVisit: number;
  dropRate: number;
  avgTimeSpend: string;
  totalInvoice: number;
  avgInvoicePerDay: number;
  salesValue: number;
  salesPerDay: number;
  totalCollection: number;
  collectionPerDay: number;
  pendingCollection: number;
};
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

  const data: Sale[] = [
    {
      sno: 1,
      route: "Route A",
      warehouse: "WH-01",
      salesman: "Amit Kumar",
      totalCustomer: 120,
      totalVisitDays: 26,
      plannedVisit: 200,
      unplannedVisit: 40,
      dropRate: 12,
      avgTimeSpend: "15 min",
      totalInvoice: 180,
      avgInvoicePerDay: 7,
      salesValue: 125000,
      salesPerDay: 4800,
      totalCollection: 100000,
      collectionPerDay: 3800,
      pendingCollection: 25000,
    },
    {
      sno: 2,
      route: "Route B",
      warehouse: "WH-02",
      salesman: "Priya Singh",
      totalCustomer: 90,
      totalVisitDays: 24,
      plannedVisit: 150,
      unplannedVisit: 30,
      dropRate: 10,
      avgTimeSpend: "12 min",
      totalInvoice: 140,
      avgInvoicePerDay: 6,
      salesValue: 98000,
      salesPerDay: 4100,
      totalCollection: 85000,
      collectionPerDay: 3500,
      pendingCollection: 13000,
    },
  ];

  const routeSalesData: RouteSales[] = [
    {
      route: "Route A",
      todaySales: 12000,
      yesterdaySales: 9500,
      weeklySales: 65000,
      last14DaysSales: 120000,
      monthSales: 240000,
      quarterSales: 720000,
      yearSales: 2800000,
    },
    {
      route: "Route B",
      todaySales: 9000,
      yesterdaySales: 8700,
      weeklySales: 54000,
      last14DaysSales: 100000,
      monthSales: 210000,
      quarterSales: 650000,
      yearSales: 2500000,
    },
    {
      route: "Route C",
      todaySales: 15000,
      yesterdaySales: 11000,
      weeklySales: 78000,
      last14DaysSales: 140000,
      monthSales: 300000,
      quarterSales: 900000,
      yearSales: 3200000,
    },
  ];

  const routeExpenseData: RouteExpense[] = [
    { route: "Route A", totalExpense: 45000 },
    { route: "Route B", totalExpense: 38000 },
    { route: "Route C", totalExpense: 52000 },
    { route: "Route D", totalExpense: 29000 },
  ];

  const routeSalesCollectionData: RouteSalesCollection[] = [
    { route: "Route A", totalSales: 120000, totalCollection: 95000 },
    { route: "Route B", totalSales: 98000, totalCollection: 87000 },
    { route: "Route C", totalSales: 150000, totalCollection: 120000 },
    { route: "Route D", totalSales: 87000, totalCollection: 65000 },
  ];

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
              height={160}
              showYearSelector={false}
              data={CompareDropSizeRevenue}
            />

            <RainbowGlowGradientLineChart
              height={160}
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
              data={routeSalesCollectionData}
              pageSize={5}
            />

            <RainbowGlowGradientLineChart title="Monthly Route Performance" />
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
              data={routeExpenseData}
              pageSize={5}
            />

            <RainbowGlowGradientLineChart title="Monthly Expense by Route" />
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
            data={routeSalesData}
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
            data={data}
            pageSize={5}
          />
        </section>
      </div>
    </div>
  );
}
