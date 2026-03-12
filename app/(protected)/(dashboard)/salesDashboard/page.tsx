"use client"

import React from "react"

import DataTableHeader from "@/components/table-data/data-table-header"
import MyForm from "./components/filter"
import { SectionCards } from "./components/section-cards"
import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line"
import { GaugePieChartCard } from "@/components/ui/PieChartWithNeedle"
import DataTableSubHeader from "@/components/table-data/data-table-sub-header"
import { CommonDataTable } from "@/components/table-data/custom-table"
import { RoundedPieChart } from "@/components/ui/rounded-pie-chart"


import { Card } from "@/components/ui/card"
import { AnimatedHighlightedAreaChart } from "@/components/ui/animated-highlighted-chart"

import {
  useBrandPerformance,
  useCustomerSegmentPerformance,
  useMaterialGroupPerformance,
  useMonthlySalesTrend,
  useRegionPerformance,
  useYearlySalesTrend,
} from "./useSales"
import { performanceColumns } from "./components/columns"

export default function Salesdashboa() {

  /* -------------------------------------------------------------------------- */
  /*                               FILTER STATE                                 */
  /* -------------------------------------------------------------------------- */

  const fallbackTableData = [
    {
      id: 1,
      name: "Sample A",
      total_sales: 120000,
      total_collection: 90000,
      total_return: 5000,
      total_exchange: 2000,
    },
    {
      id: 2,
      name: "Sample B",
      total_sales: 95000,
      total_collection: 75000,
      total_return: 4000,
      total_exchange: 1000,
    },
    {
      id: 3,
      name: "Sample C",
      total_sales: 80000,
      total_collection: 65000,
      total_return: 3000,
      total_exchange: 500,
    },
    {
      id: 4,
      name: "Sample B",
      total_sales: 95000,
      total_collection: 75000,
      total_return: 4000,
      total_exchange: 1000,
    },
    {
      id: 5,
      name: "Sample C",
      total_sales: 80000,
      total_collection: 65000,
      total_return: 3000,
      total_exchange: 500,
    },
  ]

  const [filters, setFilters] = React.useState<any>(null)

  /* -------------------------------------------------------------------------- */
  /*                           YEARLY / MONTHLY TREND                           */
  /* -------------------------------------------------------------------------- */

  const [year, setYear] = React.useState("2025")
  const { data: yearlyData = [] } =
    useYearlySalesTrend(year, filters)

  const { data: monthlyData = [] } =
    useMonthlySalesTrend(year, filters)

  /* -------------------------------------------------------------------------- */
  /*                         PERFORMANCE DATA FROM FILTERS                      */
  /* -------------------------------------------------------------------------- */

  const { data: regionPerformance = [] } =
    useRegionPerformance(filters)

  const { data: brandPerformance = [] } =
    useBrandPerformance(filters)

  const { data: materialGroupPerformance = [] } =
    useMaterialGroupPerformance(filters)

  const { data: customerSegmentPerformance = [] } =
    useCustomerSegmentPerformance(filters)

  const regionTable =
    regionPerformance?.Result?.table_data?.length
      ? regionPerformance.Result.table_data
      : fallbackTableData
  const regionPie = regionPerformance?.Result?.pie_chart ?? []
  const regionLine =
    regionPerformance?.Result?.line_chart?.map((item: any) => ({
      month: item.label,
      desktop: item.y,
    })) ?? []

  const brandTable =
    brandPerformance?.Result?.table_data?.length
      ? brandPerformance.Result.table_data
      : fallbackTableData
  const brandPie = brandPerformance?.Result?.pie_chart ?? []
  const brandLine =
    brandPerformance?.Result?.line_chart?.map((item: any) => ({
      month: item.label,
      desktop: item.y,
    })) ?? []


  const materialTable =
    materialGroupPerformance?.Result?.table_data?.length
      ? materialGroupPerformance.Result.table_data
      : fallbackTableData
  const materialPie = materialGroupPerformance?.Result?.pie_chart ?? []
  const materialLine =
    materialGroupPerformance?.Result?.line_chart?.map((item: any) => ({
      month: item.label,
      desktop: item.y,
    })) ?? []

  const customerTable =
    customerSegmentPerformance?.Result?.table_data?.length
      ? customerSegmentPerformance.Result.table_data
      : fallbackTableData

  const customerPie =
    customerSegmentPerformance?.Result?.pie_chart ?? []

  const customerLine =
    customerSegmentPerformance?.Result?.line_chart?.map((item: any) => ({
      month: item.label,
      desktop: item.y,
    })) ?? []

  return (
    <div className="flex flex-1 flex-col">

      <div className="@container/main flex flex-1 flex-col">

        {/* PAGE HEADER */}

        <div className="py-6">
          <DataTableHeader title="Sales Dashboard" />
        </div>

        {/* FILTER SECTION */}

        <div className="lg:px-2 px-1 pb-4">
          <Card className="shadow-lg">
            <MyForm onFilter={setFilters} />
          </Card>
        </div>

        {/* KPI SUMMARY */}

        <div className="lg:px-2 px-1 pb-6">
          <SectionCards filters={filters} />
        </div>

        {/* TOP CHARTS */}

        <section className="grid gap-6 lg:px-2 px-1 pb-8 grid-cols-1 lg:grid-cols-3">

          <RainbowGlowGradientLineChart
            title="Sales By Monthly Trends"
            data={monthlyData}
            year={year}
            setYear={setYear}
          />

          <AnimatedHighlightedAreaChart
            title="Sales By Yearly Trends"
            description={`Sales overview for ${year}`}
            data={yearlyData}
          />
          <GaugePieChartCard />

        </section>

        {/* REGION PERFORMANCE */}

        <div className="lg:px-2 px-1 pb-8">

          <DataTableSubHeader title="Region Performance" />

          <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-3">

            <CommonDataTable
              columns={performanceColumns}
              data={regionTable}
              pageSize={5}
              title="Region Performance"
            />

            <RoundedPieChart
              title="Sales By Region Contribution"
              data={regionPie}
            />

            <RainbowGlowGradientLineChart
              title="Region Monthly Sales Trend"
              data={regionLine}
              showYearSelector={false}
            />

          </section>

        </div>

        {/* BRAND PERFORMANCE */}

        <div className="lg:px-2 px-1 pb-8">

          <DataTableSubHeader title="Brand Performance" />

          <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-3">

            <CommonDataTable
              columns={performanceColumns}
              data={brandTable}
              pageSize={5}
              title="Brand Performance"
            />

            <RoundedPieChart
              title="Sales By Brand Contribution"
              data={brandPie}
            />

            <RainbowGlowGradientLineChart
              title="Brand Monthly Sales Trend"
              data={brandLine}
              showYearSelector={false}
            />

          </section>

        </div>

        {/* MATERIAL GROUP PERFORMANCE */}

        <div className="lg:px-2 px-1 pb-10">

          <DataTableSubHeader title="Material Group" />

          <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-3">

            <CommonDataTable
              columns={performanceColumns}
              data={materialTable}
              pageSize={5}
              title="Material Group"
            />

            <RoundedPieChart

              title="Sales By Material Group Contribution"
              data={materialPie}
            />

            <RainbowGlowGradientLineChart
              title="Material Group Monthly Sales Trend"
              data={materialLine}
              showYearSelector={false}
            />

          </section>

        </div>

        {/* CUSTOMER SEGMENT */}

        <div className="lg:px-2 px-1 pb-10">

          <DataTableSubHeader title="Customer Segment Performance" />

          <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-3">

            <CommonDataTable
              columns={performanceColumns}
              data={customerTable}
              pageSize={5}
              title="Customer Segment"
            />

            <RoundedPieChart
              title="Sales By Customer Segment Contribution"
              data={customerPie}
            />

            <RainbowGlowGradientLineChart
              title="Customer Segment Monthly Sales Trend"
              data={customerLine}
              showYearSelector={false}
            />
          </section>

        </div>

      </div>

    </div>
  )
}