"use client"
import DataTableHeader from "@/components/table-data/data-table-header";
import MyForm from "./components/filter1";
import { SectionCards } from "./components/section-cards";
import { GlowingLineChart } from "@/components/ui/glowing-line";
import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line";
import { GaugePieChartCard } from "@/components/ui/PieChartWithNeedle";
import DataTableSubHeader from "@/components/table-data/data-table-sub-header";
import { ColumnDef } from "@tanstack/react-table";
import { CommonDataTable } from "@/components/table-data/common-tables";
import { RoundedPieChart } from "@/components/ui/rounded-pie-chart";
import LineCharts from "@/components/charts/linechart";
import LineCharts1 from "@/components/charts/lineChart1";
import { GlowingRadialChart } from "@/components/ui/glowing-radial-chart";
import { IncreaseSizePieChart } from "@/components/ui/increase-size-pie-chart";
import { salesColumns } from "./components/columns"
import { HighlightedBarChart } from "@/components/ui/highlighted-bar-chart";
import { DataTable } from "./components/data-table";
import data from "./components/data.json";





export default function Salesdashboa() {


 
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col">
          {/* PAGE HEADER */}
          <div className=" py-6">
            <DataTableHeader title="Customers Dashboard" />
          </div>
          {/* FILTERS */}
          <div className="px-6 pb-4">
            <MyForm />
          </div>
          {/* TOP CHARTS */}
          <section className="grid gap-6 px-6 pb-8 grid-cols-1 lg:grid-cols-3">
            <SectionCards />
            <GlowingLineChart />
            <GaugePieChartCard />
          </section>



          {/* BAR CHART HEADER */}
          <section className="px-6 pb-10 space-y-4">
            {/* Sub Header */}
            <DataTableSubHeader title="Customers By Region" />

            {/* Chart */}
            <div className="grid grid-cols-1 gap-6">
              <div className="h-full">
                <HighlightedBarChart />
              </div>
            </div>
          </section>

          <section className="px-6 pb-10 space-y-4">
            {/* Sub Header */}
            <DataTableSubHeader title="Top Customers By" />

            {/* Chart */}
            <div className="grid grid-cols-1 gap-6">
              <div className="">
                <MyForm />
              </div>
              <div className="lg:col-span-1">
               <DataTable data={data} />
                
              </div>
            </div>
          </section>



        </div>
      </div>
    </>
  );
}