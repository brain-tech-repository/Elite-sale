"use client"

import { useState } from "react"

import DataTableHeader from "@/components/table-data/data-table-header"
import MyForm from "./components/filter"

import { SectionCards } from "./components/section-cards"
import { GaugePieChartCard } from "@/components/ui/PieChartWithNeedle"
import DataTableSubHeader from "@/components/table-data/data-table-sub-header"

import { Card } from "@/components/ui/card"

import { GlowingBarVerticalChart } from "@/components/ui/glowing-bar-vertical-chart"
import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line"
import { useMonthlyTrend, useRegionPerformance } from "./useCustomers"
import { SalesFilterPayload } from "./types"

export default function CustomerDashboard() {

  const [filters, setFilters] = useState<SalesFilterPayload | null>(null)
  const [year, setYear] = useState("2025")

  const { data: monthlyTrend = [] } = useMonthlyTrend(filters)

  //const { data: regionPerformance = [] } = useRegionPerformance(filters)
  const { data } = useRegionPerformance(filters)

const chartData = data?.chartData || []
const regions = data?.regions || []

  return (
    <div className="flex flex-1 flex-col">

      <div className="@container/main flex flex-1 flex-col">

        {/* PAGE HEADER */}

        <div className="py-6">
          <DataTableHeader title="Customers Dashboard" />
        </div>

        {/* FILTER */}

        <div className="lg:px-6 px-1 pb-4">
          <Card className="shadow-lg lg:px-5">
            <MyForm onFilter={setFilters} />
          </Card>
        </div>

        {/* KPI SECTION */}

        <section className="grid gap-6 lg:px-6 px-1 pb-8 grid-cols-1 lg:grid-cols-3">

          <SectionCards filters={filters} />

          <RainbowGlowGradientLineChart
            title="Monthly Trend of Customers Creation"
            showYearSelector={false}
            data={monthlyTrend}
            year={"2025"}
            setYear={setYear}
          />

          <GaugePieChartCard />

        </section>

        {/* REGION PERFORMANCE */}

        <section className="lg:px-6 px-1 pb-10 space-y-4">

          <DataTableSubHeader title="Customers By Region" />

          <div className="grid grid-cols-1 gap-6">
            <div className="h-full">
       <GlowingBarVerticalChart
  data={chartData}
  regions={regions}
/>
            </div>
          </div>

        </section>

      </div>

    </div>
  )
}