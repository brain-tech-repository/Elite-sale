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
import { AnimatedHighlightedAreaChart } from "@/components/ui/animated-highlighted-chart";


/* -------------------------------------------------------------------------- */
/*                              SALES TYPE MODEL                              */
/* -------------------------------------------------------------------------- */

type Sale = {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: "Completed" | "Pending" | "Cancelled";
  date: string;
};

export default function Salesdashboa() {

  /* -------------------------------------------------------------------------- */
  /*                              SAMPLE TABLE DATA                             */
  /* -------------------------------------------------------------------------- */

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

          {/* -------------------------------------------------------------------------- */}
          {/*                                PAGE HEADER                                 */}
          {/* -------------------------------------------------------------------------- */}

          <div className="py-6">
            <DataTableHeader title="Sales Dashboard" />
          </div>


          {/* -------------------------------------------------------------------------- */}
          {/*                                FILTER SECTION                              */}
          {/*                         (Date / Region / Brand filters)                    */}
          {/* -------------------------------------------------------------------------- */}

          <div className="lg:lg:px-6 px-1 pb-4">
            <Card className="shadow-lg">
              <MyForm />
            </Card>
          </div>


          {/* -------------------------------------------------------------------------- */}
          {/*                               KPI SUMMARY CARDS                            */}
          {/*                    (Total Sales, Revenue, Orders etc.)                     */}
          {/* -------------------------------------------------------------------------- */}

          <div className="lg:lg:px-6 px-1 pb-6">
            <SectionCards />
          </div>


          {/* -------------------------------------------------------------------------- */}
          {/*                            TOP ANALYTICS CHARTS                            */}
          {/*               Yearly Sales Trend | Monthly Trend | Gauge Chart             */}
          {/* -------------------------------------------------------------------------- */}

          <section className="grid gap-6 lg:lg:px-6 px-1 pb-8 grid-cols-1 lg:grid-cols-3">

            {/* Yearly Sales Trend */}
            <AnimatedHighlightedAreaChart
              title="Sales By Yearly Trends"
            />

            {/* Monthly Sales Trend */}
            <RainbowGlowGradientLineChart
              title="Sales By Monthly Trends"
            />

            {/* Overall Sales Performance Gauge */}
            <GaugePieChartCard />

          </section>


          {/* -------------------------------------------------------------------------- */}
          {/*                           SECTION 1 : REGION PERFORMANCE                   */}
          {/*         Table + Region Contribution Pie Chart + Monthly Sales Trend       */}
          {/* -------------------------------------------------------------------------- */}

          <div className="lg:lg:px-6 px-1 pb-8">

            <DataTableSubHeader title="Region Performance" />

            <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-3">

              {/* Region Sales Table */}
              <CommonDataTable
                columns={salesColumns}
                data={data}
                pageSize={5}
                title="Region Performance"
              />

              {/* Region Sales Contribution */}
              <RoundedPieChart
                title="Sales By Region Contribution"
                description="Based on last 30 days"
              />

              {/* Region Monthly Trend */}
              <LineCharts
                title="Region Monthly Sales Trend"
                description="Based on last 30 days"
              />

            </section>
          </div>


          {/* -------------------------------------------------------------------------- */}
          {/*                           SECTION 2 : BRAND PERFORMANCE                    */}
          {/*        Table + Brand Contribution Chart + Monthly Brand Sales Trend       */}
          {/* -------------------------------------------------------------------------- */}

          <div className="lg:lg:px-6 px-1 pb-8">

            <DataTableSubHeader title="Brand Performance" />

            <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-3">

              {/* Brand Sales Table */}
              <div className="lg:col-span-1">
                <CommonDataTable
                  columns={salesColumns}
                  data={data}
                  pageSize={5}
                  title="Brand Performance"
                />
              </div>

              {/* Brand Contribution Chart */}
              <GlowingRadialChart title="Sales By Brand Contribution" />

              {/* Brand Monthly Trend */}
              <RainbowGlowGradientLineChart
                title="Brand Monthly Sales Trend"
                showYearSelector={false}
              />

            </section>
          </div>


          {/* -------------------------------------------------------------------------- */}
          {/*                           SECTION 3 : MATERIAL GROUP                       */}
          {/*     Table + Material Group Contribution Chart + Monthly Trend Chart       */}
          {/* -------------------------------------------------------------------------- */}

          <div className="lg:lg:px-6 px-1 pb-10">

            <DataTableSubHeader title="Material Group" />

            <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-3">

              {/* Material Group Table */}
              <div className="lg:col-span-1">
                <CommonDataTable
                  columns={salesColumns}
                  data={data}
                  pageSize={5}
                  title="Customer Segment"
                />
              </div>

              {/* Material Group Contribution */}
              <IncreaseSizePieChart
                title="Sales By Material Group Contribution"
              />

              {/* Material Group Monthly Trend */}
              <RainbowGlowGradientLineChart
                title="Material Group Monthly Sales Trend"
                showYearSelector={false}
              />

            </section>
          </div>


          {/* -------------------------------------------------------------------------- */}
          {/*                       SECTION 4 : CUSTOMER SEGMENT PERFORMANCE             */}
          {/*     Table + Customer Segment Contribution + Monthly Sales Trend Chart     */}
          {/* -------------------------------------------------------------------------- */}

          <div className="lg:lg:px-6 px-1 pb-10">

            <DataTableSubHeader title="Customer Segment Performance" />

            <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-3">

              {/* Customer Segment Table */}
              <div className="lg:col-span-1">
                <CommonDataTable
                  columns={salesColumns}
                  data={data}
                  pageSize={5}
                  title="Customer Segment"
                />
              </div>

              {/* Customer Segment Contribution */}
              <IncreaseSizePieChart
                title="Sales By Customer Segment Contribution"
              />

              {/* Customer Segment Monthly Trend */}
              <RainbowGlowGradientLineChart
                title="Customer Segment Monthly Sales Trend"
                showYearSelector={false}
              />

            </section>
          </div>

        </div>
      </div>
    </>
  );
}