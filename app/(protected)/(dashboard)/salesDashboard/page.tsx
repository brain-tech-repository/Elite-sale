"use client"
import DataTableHeader from "@/components/table-data/data-table-header";
import MyForm from "./components/filter";
import { SectionCards } from "./components/section-cards";
import { GlowingLineChart } from "@/components/ui/glowing-line";
import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line";
import { GaugePieChartCard } from "@/components/ui/PieChartWithNeedle";
import DataTableSubHeader from "@/components/table-data/data-table-sub-header";
import { ColumnDef } from "@tanstack/react-table";
import { CommonDataTable } from "@/components/table-data/custom-table";
import { RoundedPieChart } from "@/components/ui/rounded-pie-chart";
import LineCharts from "@/components/charts/linechart";
import LineCharts1 from "@/components/charts/lineChart1";
import { GlowingRadialChart } from "@/components/ui/glowing-radial-chart";
import { IncreaseSizePieChart } from "@/components/ui/increase-size-pie-chart";
import { salesColumns } from "./components/columns"
import { Card } from "@/components/ui/card";


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
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col">

          {/* PAGE HEADER */}
          <div className=" py-6">
            <DataTableHeader title="Finance Dashboard" />
          </div>
          {/* FILTERS */}
          <div className="px-6 pb-4">
           <Card className="shadow-lg"> <MyForm /></Card>
          </div>
          {/* KPI CARDS */}
          <div className="px-6 pb-6">
            <SectionCards />
          </div>
          {/* TOP CHARTS */}
          <section className="grid gap-6 px-6 pb-8 grid-cols-1 lg:grid-cols-3">
            <GlowingLineChart />
            <RainbowGlowGradientLineChart />
            <GaugePieChartCard />
          </section>
          {/* SECTION 1 */}
          <div className="px-6 pb-8">
            <DataTableSubHeader title="Sales Overview" />
            <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-3">
              <CommonDataTable columns={salesColumns} data={data} pageSize={5} />
              <RoundedPieChart />
              <LineCharts />
            </section>
          </div>
          {/* SECTION 2 */}
          <div className="px-6 pb-8">
            <DataTableSubHeader title="Regional Sales" />

            <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <CommonDataTable columns={salesColumns} data={data} pageSize={5} />
              </div>
              <GlowingRadialChart />
              <LineCharts1 />
            </section>
          </div>
          {/* SECTION 3 */}
          <div className="px-6 pb-10">
            <DataTableSubHeader title="Growth Analytics" />
            <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <CommonDataTable columns={salesColumns} data={data} pageSize={5} />
              </div>
              <IncreaseSizePieChart />
              <RainbowGlowGradientLineChart />
            </section>
          </div>

        </div>
      </div>
    </>
  );
}