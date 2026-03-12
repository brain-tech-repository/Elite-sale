"use client"

import React from "react"

/* UI COMPONENTS */

import DataTableHeader from "@/components/table-data/data-table-header"
import DataTableSubHeader from "@/components/table-data/data-table-sub-header"
import { CommonDataTable } from "@/components/table-data/custom-table"

import { Card } from "@/components/ui/card"
import { RoundedPieChart } from "@/components/ui/rounded-pie-chart"
import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line"
import { GaugePieChartCard } from "@/components/ui/PieChartWithNeedle"
import { AnimatedHighlightedAreaChart } from "@/components/ui/animated-highlighted-chart"

/* SKELETON */

import {
  ChartSkeleton,
  TableSkeleton,
  CardsSkeleton,
} from "@/components/ui/dashboard-skeleton"

/* LOCAL */

import MyForm from "./components/filter"
import { SectionCards } from "./components/section-cards"
import { performanceColumns } from "./components/columns"

/* API */

import {
  useBrandPerformance,
  useCustomerSegmentPerformance,
  useMaterialGroupPerformance,
  useMonthlySalesTrend,
  useRegionPerformance,
  useYearlySalesTrend,
} from "./useSales"

import { fallbackTableData } from "./components/data/fallback"



export default function Salesdashboa() {

  const [filters, setFilters] = React.useState<any>(null)

  const [year, setYear] = React.useState("2025")


  /* SALES TREND */

  const {
    data: monthlyData = [],
    isLoading: monthlyLoading
  } = useMonthlySalesTrend(year, filters)

  const {
    data: yearlyData = [],
    isLoading: yearlyLoading
  } = useYearlySalesTrend(year, filters)


  /* PERFORMANCE */

  const {
    data: regionPerformance = [],
    isLoading: regionLoading
  } = useRegionPerformance(filters)

  const {
    data: brandPerformance = [],
    isLoading: brandLoading
  } = useBrandPerformance(filters)

  const {
    data: materialGroupPerformance = [],
    isLoading: materialLoading
  } = useMaterialGroupPerformance(filters)

  const {
    data: customerSegmentPerformance = [],
    isLoading: customerLoading
  } = useCustomerSegmentPerformance(filters)



  /* REGION DATA */

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



  /* BRAND DATA */

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



  /* MATERIAL DATA */

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



  /* CUSTOMER DATA */

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

        <div className="py-6">
          <DataTableHeader title="Sales Dashboard" />
        </div>


        {/* FILTER */}

        <div className="lg:px-2 px-1 pb-4">
          <Card className="shadow-lg">
            <MyForm onFilter={setFilters} />
          </Card>
        </div>


        {/* KPI CARDS */}

        <div className="lg:px-2 px-1 pb-6">
          <SectionCards filters={filters} />
        </div>


        {/* TOP CHARTS */}

        <section className="grid gap-6 lg:px-2 px-1 pb-8 grid-cols-1 lg:grid-cols-3">

          {monthlyLoading
            ? <ChartSkeleton/>
            : (
              <RainbowGlowGradientLineChart
                title="Sales By Monthly Trends"
                data={monthlyData}
                year={year}
                setYear={setYear}
              />
            )}

          {yearlyLoading
            ? <ChartSkeleton/>
            : (
              <AnimatedHighlightedAreaChart
                title="Sales By Yearly Trends"
                description={`Sales overview for ${year}`}
                data={yearlyData}
              />
            )}

          <GaugePieChartCard />

        </section>



        {/* REGION */}

        <div className="lg:px-2 px-1 pb-8">

          <DataTableSubHeader title="Region Performance" />

          <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-3">

            {regionLoading ? (
              <>
                <TableSkeleton/>
                <ChartSkeleton/>
                <ChartSkeleton/>
              </>
            ) : (
              <>
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
              </>
            )}

          </section>

        </div>



        {/* BRAND */}

        <div className="lg:px-2 px-1 pb-8">

          <DataTableSubHeader title="Brand Performance" />

          <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-3">

            {brandLoading ? (
              <>
                <TableSkeleton/>
                <ChartSkeleton/>
                <ChartSkeleton/>
              </>
            ) : (
              <>
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
              </>
            )}

          </section>

        </div>



        {/* MATERIAL */}

        <div className="lg:px-2 px-1 pb-10">

          <DataTableSubHeader title="Material Group" />

          <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-3">

            {materialLoading ? (
              <>
                <TableSkeleton/>
                <ChartSkeleton/>
                <ChartSkeleton/>
              </>
            ) : (
              <>
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
              </>
            )}

          </section>

        </div>



        {/* CUSTOMER */}

        <div className="lg:px-2 px-1 pb-10">

          <DataTableSubHeader title="Customer Segment Performance" />

          <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-3">

            {customerLoading ? (
              <>
                <TableSkeleton/>
                <ChartSkeleton/>
                <ChartSkeleton/>
              </>
            ) : (
              <>
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
              </>
            )}

          </section>

        </div>

      </div>

    </div>
  )
}