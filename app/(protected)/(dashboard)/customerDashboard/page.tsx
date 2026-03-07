"use client"
import DataTableHeader from "@/components/table-data/data-table-header";
import MyForm from "./components/filter1";
import { SectionCards } from "./components/section-cards";
import { GlowingLineChart } from "@/components/ui/glowing-line";
import { GaugePieChartCard } from "@/components/ui/PieChartWithNeedle";
import DataTableSubHeader from "@/components/table-data/data-table-sub-header";
import { HighlightedBarChart } from "@/components/ui/highlighted-bar-chart";

import data from "./components/data.json";
import { Card } from "@/components/ui/card";

import { sectionColumns } from "./components/columns";
import { CommonDataTable } from "@/components/table-data/common-table";
import { GlowingBarVerticalChart } from "@/components/ui/glowing-bar-vertical-chart";
export default function Salesdashboa() {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col ">
          {/* PAGE HEADER */}
          <div className=" py-6">
            <DataTableHeader title="Customers Dashboard" />
          </div>
          {/* FILTERS */}

          <div className="px-6 pb-4 ">
            <Card className="shadow-lg lg:px-5 "> <MyForm /></Card>
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
                <GlowingBarVerticalChart />
              </div>
            </div>
          </section>
          <section className="px-6 pb-10 space-y-4">
            {/* Sub Header */}
            <DataTableSubHeader title="Top Customers By" />
            {/* Chart */}
            <Card className="grid grid-cols-1 gap-6 shadow-lg lg:px-5">
              <div className="">
                <MyForm />
              </div>

            </Card>
            <div className="lg:col-span-1">
              <Card className="shadow-lg py-2">
                <CommonDataTable
                  columns={sectionColumns}
                  data={data}
                  pageSize={5}
                  headerTitle="Top Customers By"
                /></Card>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}