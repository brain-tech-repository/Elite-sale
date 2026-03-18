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
import { SalesFilterPayload } from "./types";
import { useState } from "react";
import { useRegionPerformance } from "../customerDashboard/useCustomers";
import {
  useGrowthPerformance,
  useMonthlyCompareDropSizeRevenue,
  useMonthlyCompareDropSizeVolume,
  useMonthlyTrend,
} from "./useRoutes";

type Sale = {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: "Completed" | "Pending" | "Cancelled";
  date: string;
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
      id: "ORD-001",
      customer: "Amit ",
      product: "Premium ",
      amount: 450,
      status: "Completed",
      date: "02 Mar",
    },
    {
      id: "ORD-002",
      customer: "Priya Singh",
      product: "Mock Test Series",
      amount: 320,
      status: "Pending",
      date: "01 Mar 2026",
    },
    {
      id: "ORD-003",
      customer: "Rahul Verma",
      product: "Recorded Batch",
      amount: 210,
      status: "Cancelled",
      date: "28 Feb 2026",
    },
    {
      id: "ORD-003",
      customer: "Rahul Verma",
      product: "Recorded Batch",
      amount: 210,
      status: "Cancelled",
      date: "28 Feb 2026",
    },
  ];

  const datas: any[] = [
    { label: "Sales Growth", value: 75 },
    { label: "Customer Growth", value: 45 },
    { label: "Revenue Growth", value: 90 },
  ];

  const salesTrend1 = [
    { month: "Jan", desktop: 100 },
    { month: "Feb", desktop: 8000 },
    { month: "Mar", desktop: 4000 },
    { month: "Apr", desktop: 2000 },
  ];

  const salesTrend2 = [
    { month: "Jan", desktop: 8000 },
    { month: "Feb", desktop: 1000 },
    { month: "Mar", desktop: 2000 },
    { month: "Apr", desktop: 7000 },
  ];

  return (
    <div className="flex flex-1 flex-col">
      {/* ================= HEADER ================= */}
      <div className="px-6 py-6">
        <DataTableHeader title="Route Dashboard" />
      </div>

      {/* ================= FILTER SECTION ================= */}
      <section className="px-6 pb-6">
        <Card className="shadow-sm">
          <MyForm
            onFilter={(f) => {
              setGlobalFilters(f);
            }}
          />
        </Card>
      </section>

      {/* ================= KPI CARDS ================= */}
      <section className="px-6 pb-6">
        <SectionCards filters={globalFilters} />
      </section>

      {/* ================= TOP CHARTS ================= */}
      <section className="grid gap-6 px-6 pb-8 grid-cols-1 lg:grid-cols-3">
        <GrowthLines data={regionData} isLoading={regionLoading} />
        <AdvancedBarChart data={monthlyTrend} />

        {/* Right side stacked charts */}
        <div className="flex flex-col gap-6">
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
      <section className="px-6 pb-8">
        <DataTableSubHeader title="Route Performance" />

        <div className="mt-4">
          <Card className="shadow-sm">
            <MyForm1 />
          </Card>
        </div>

        <div className="grid gap-6 mt-2 grid-cols-1 lg:grid-cols-2">
          <CommonDataTable
            title="TOP PERFORMER"
            columns={salesColumns}
            data={data}
            pageSize={5}
          />
          <RainbowGlowGradientLineChart title="Monthly Route Performance" />
        </div>
      </section>

      {/* ================= EXPENSE ANALYSIS ================= */}
      <section className="px-6 pb-8">
        <DataTableSubHeader title="Route Expense Analysis" />

        <div className="grid gap-6 mt-2 grid-cols-1 lg:grid-cols-2">
          <CommonDataTable
            title="Expense By Route"
            columns={salesColumns}
            data={data}
            pageSize={5}
          />
          <RainbowGlowGradientLineChart title="Monthly Expense by Route" />
        </div>
      </section>

      {/* ================= SALES REPORT ================= */}
      <section className="px-6 pb-8">
        <DataTableSubHeader title="Route Wise Sales Report" />

        <div className="mt-2">
          <CommonDataTable
            title="Sale By Route"
            columns={salesColumns}
            data={data}
            pageSize={5}
          />
        </div>
      </section>

      {/* ================= EFFICIENCY OVERVIEW ================= */}
      <section className="px-6 pb-10">
        <DataTableSubHeader title="Route Efficency Overview" />
        <div className="mt-2">
          <CommonDataTable
            title="Route Efficency"
            columns={salesColumns}
            data={data}
            pageSize={5}
          />
        </div>
      </section>
    </div>
  );
}
