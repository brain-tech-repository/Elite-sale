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
import { AnimatedHatchedPatternAreaChart } from "@/components/ui/animated-hatched-pattern-chart";
import { HighlightedMultipleBarChart } from "@/components/ui/highlighted-multiple-bar-chart";
import AreaChartFillByValue from "@/components/ui/areaChartFillByValue";
import { DuotoneVerticalBarMultipleChart } from "@/components/ui/duotone-bar-multiple-chart";


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



          {/* KPI CARDS */}
          <div className="px-6 pb-6">
            <SectionCards />
          </div>

          {/* TOP CHARTS */}
          <section className="grid gap-6 px-6 pb-8 grid-cols-1 lg:grid-cols-2">
            <GlowingLineChart />
            <AnimatedHatchedPatternAreaChart />
            <HighlightedMultipleBarChart />
            <AreaChartFillByValue />
            < DuotoneVerticalBarMultipleChart/>
            <RoundedPieChart />
            <></>
          </section>
        </div>
      </div>
    </>
  );
}