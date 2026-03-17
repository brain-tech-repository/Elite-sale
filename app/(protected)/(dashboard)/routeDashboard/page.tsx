"use client";
import DataTableHeader from "@/components/table-data/data-table-header";
import MyForm from "./components/filter";
import MyForm1 from "./components/filter1";
import { SectionCards } from "./components/section-cards";
import { GlowingLineChart } from "@/components/ui/glowing-line";
import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line";

import DataTableSubHeader from "@/components/table-data/data-table-sub-header";
import { CommonDataTable } from "@/components/table-data/custom-table";
import { salesColumns } from "./components/columns";
import { Card } from "@/components/ui/card";
import VerticalComposedChart from "@/components/ui/VerticalComposedChart";
// import { AdvancedBarChart } from "@/components/ui/highlighted-double-bar-chart";
import { RainbowGlowGradientLineCharts } from "@/components/ui/rainbow-glow-gradient-lines";
import GrowthLines from "@/components/growthlines";
import { AdvancedBarChart } from "@/components/ui/advancebar";
type Sale = {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: "Completed" | "Pending" | "Cancelled";
  date: string;
};
export default function Salesdashboa() {
  const data: Sale[] = [
    {
      id: "ORD-001",
      customer: "Amit Sharma",
      product: "Premium Course",
      amount: 450,
      status: "Completed",
      date: "02 Mar 2026",
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
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col">
          {/* PAGE HEADER */}
          <div className=" py-6">
            <DataTableHeader title="Route Dashboard" />
          </div>
          {/* FILTERS */}
          <div className="lg:px-6 px-1 pb-4">
            <Card className="shadow-sm">
              {" "}
              <MyForm />
            </Card>
          </div>
          {/* KPI CARDS */}
          <div className="lg:px-6 px-1 pb-6">
            <SectionCards />
          </div>
          {/* TOP CHARTS */}
          <section className="grid gap-6 lg:px-6 px-1 pb-8 grid-cols-1 lg:grid-cols-3">
            <GrowthLines items={datas} />
            <AdvancedBarChart />
            <div className="flex flex-col gap-4">
              <RainbowGlowGradientLineChart
                height={160}
                showYearSelector={false}
                data={salesTrend1} // 👈 custom data
                title="Sales Trend A"
              />

              <RainbowGlowGradientLineChart
                height={160}
                showYearSelector={false}
                data={salesTrend2} // 👈 custom data
                title="Sales Trend B"
              />
            </div>
          </section>
          {/* SECTION 1 */}
          <div className="lg:px-6 px-1 pb-8">
            <Card className="shadow-sm">
              {" "}
              <MyForm1 />
            </Card>

            <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-2">
              <CommonDataTable
                columns={salesColumns}
                data={data}
                pageSize={5}
              />

              <RainbowGlowGradientLineChart />
            </section>
          </div>

          {/* SECTION 3 */}
          <div className="lg:px-6 px-1 pb-10">
            <DataTableSubHeader title="Route Expense Analysis" />
            <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-2">
              <div className="lg:col-span-1">
                <CommonDataTable
                  columns={salesColumns}
                  data={data}
                  pageSize={5}
                />
              </div>

              <RainbowGlowGradientLineChart />
            </section>
          </div>
          <div className="lg:px-6 px-1 pb-10">
            <DataTableSubHeader title="Route Wise Sales Report" />
            <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-1">
              <div className="lg:col-span-1">
                <CommonDataTable
                  columns={salesColumns}
                  data={data}
                  pageSize={5}
                />
              </div>
            </section>
          </div>
          <div className="lg:px-6 px-1 pb-10">
            <DataTableSubHeader title="Route Efficency Overview" />
            <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-1">
              <div className="lg:col-span-1">
                <CommonDataTable
                  columns={salesColumns}
                  data={data}
                  pageSize={5}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
