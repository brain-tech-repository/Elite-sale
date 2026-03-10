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
import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line";

export default function Salesdashboa() {

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col">

          {/* -------------------------------------------------------------------------- */}
          {/*                                PAGE HEADER                                 */}
          {/*                Main dashboard title shown at the top of page               */}
          {/* -------------------------------------------------------------------------- */}

          <div className="py-6">
            <DataTableHeader title="Customers Dashboard" />
          </div>


          {/* -------------------------------------------------------------------------- */}
          {/*                                FILTER SECTION                              */}
          {/*               Filters used to refine customer data (date, region etc.)    */}
          {/* -------------------------------------------------------------------------- */}

          <div className="lg:px-6 px-1 pb-4">
            <Card className="shadow-lg lg:px-5">
              <MyForm />
            </Card>
          </div>


          {/* -------------------------------------------------------------------------- */}
          {/*                            TOP KPI & ANALYTICS SECTION                     */}
          {/*      Contains KPI cards, customer trend chart and overall gauge chart     */}
          {/* -------------------------------------------------------------------------- */}

          <section className="grid gap-6 lg:px-6 px-1 pb-8 grid-cols-1 lg:grid-cols-3">

            {/* Customer KPI Summary Cards */}
            <SectionCards />

            {/* Customer Trend Line Chart */}
            <RainbowGlowGradientLineChart
              title="Monthly Trend of Customers Creation"
              showYearSelector={false}
            />

            {/* Overall Customer Performance Gauge */}
            <GaugePieChartCard />

          </section>


          {/* -------------------------------------------------------------------------- */}
          {/*                           CUSTOMERS BY REGION SECTION                      */}
          {/*        Displays customer distribution across regions using bar chart      */}
          {/* -------------------------------------------------------------------------- */}

          <section className="lg:px-6 px-1 pb-10 space-y-4">

            {/* Section Sub Header */}
            <DataTableSubHeader title="Customers By Region" />

            {/* Region Distribution Chart */}
            <div className="grid grid-cols-1 gap-6">
              <div className="h-full">
                <GlowingBarVerticalChart />
              </div>
            </div>

          </section>


          {/* -------------------------------------------------------------------------- */}
          {/*                        TOP CUSTOMERS ANALYSIS SECTION                      */}
          {/*      Filter + Table showing highest performing customers by criteria      */}
          {/* -------------------------------------------------------------------------- */}

          <section className="lg:px-6 px-1 pb-10 space-y-4">

            {/* Section Sub Header */}
            <DataTableSubHeader title="Top Customers By" />

            {/* Filter for selecting criteria (Region / Revenue / Orders etc.) */}
            <Card className="grid grid-cols-1 gap-6 shadow-lg lg:px-5">
              <div>
                <MyForm />
              </div>
            </Card>

            {/* Top Customers Table */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg py-2">
                <CommonDataTable
                  columns={sectionColumns}
                  data={data}
                  pageSize={5}
                  headerTitle="Top Customers By"
                />
              </Card>
            </div>

          </section>

        </div>
      </div>
    </>
  );
}