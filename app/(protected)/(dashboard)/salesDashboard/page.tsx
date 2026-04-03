"use client";
import React from "react";
/* UI COMPONENTS */
import DataTableHeader from "@/components/table-data/data-table-header";
import DataTableSubHeader from "@/components/table-data/data-table-sub-header";
import { CommonDataTable } from "@/components/table-data/custom-table";
import { Card } from "@/components/ui/card";
import { RoundedPieChart } from "@/components/ui/rounded-pie-chart";
import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line";
import { AnimatedHighlightedAreaChart } from "@/components/ui/animated-highlighted-chart";
/* SKELETON */
import {
  ChartSkeleton,
  TableSkeleton,
} from "@/components/ui/dashboard-skeleton";
import { useInView } from "react-intersection-observer";
/* LOCAL */
import MyForm from "./components/filter";
import { SectionCards } from "./components/section-cards";
import { performanceColumns } from "./components/columns";
/* API */
import {
  useBrandLinePerformance,
  useBrandPerformance,
  useCustomerLinePerformance,
  useCustomerSegmentPerformance,
  useDistributorChart,
  useMaterialGroupPerformance,
  useMaterialLinePerformance,
  useMonthlySalesTrend,
  useRegionLinePerformance,
  useRegionPerformance,
  useYearlySalesTrend,
} from "./useSales";

import { fallbackTableData } from "./components/data/fallback";
// import { GaugeChart } from "@/components/ui/PieChartWithNeedle";
import { GaugePieChartCard } from "@/components/ui/PieChartWithNeedle";
import { AdvancedBarChart } from "@/components/ui/advancebar";
import { AdvancedBarChart1 } from "@/components/ui/advancebar1";
export default function Salesdashboa() {
  const getDefaultFilters = () => {
    const today = new Date();

    const formattedDate = today.toISOString().split("T")[0]; // YYYY-MM-DD

    return {
      from_date: formattedDate,
      to_date: formattedDate,
    };
  };

  const [filters, setFilters] = React.useState<any>(getDefaultFilters());
  const [year, setYear] = React.useState("2026");
  // Ensure this matches the string format your API/chart expects (e.g., "January")
  const [sortType, setSortType] = React.useState("TARGET");
  const [selectedMonth, setSelectedMonth] = React.useState<string | null>(
    "April",
  );

  // REGION
  const { ref: regionRef, inView: regionInView } = useInView({
    triggerOnce: true,
  });

  // BRAND
  const { ref: brandRef, inView: brandInView } = useInView({
    triggerOnce: true,
  });

  // MATERIAL
  const { ref: materialRef, inView: materialInView } = useInView({
    triggerOnce: true,
  });

  // CUSTOMER
  const { ref: customerRef, inView: customerInView } = useInView({
    triggerOnce: true,
  });

  const { ref: distributorRef, inView: distributorInView } = useInView({
    triggerOnce: true,
  });

  /* SALES TREND */
  const { data: monthlyData = [], isLoading: monthlyLoading } =
    useMonthlySalesTrend(year, selectedMonth, filters);

  const { data: yearlyData = [], isLoading: yearlyLoading } =
    useYearlySalesTrend(year, filters);

  /* PERFORMANCE */

  const { data: regionPerformance = {}, isLoading: regionLoading } =
    useRegionPerformance(filters, regionInView);

  const regionTable = regionPerformance?.table_data ?? [];
  const regionPie = regionPerformance?.pie_chart ?? [];

  const { data: brandPerformance = {}, isLoading: brandLoading } =
    useBrandPerformance(filters, brandInView);

  const brandTable = brandPerformance?.table_data ?? [];
  const brandPie = brandPerformance?.pie_chart ?? [];

  const { data: materialGroupPerformance = {}, isLoading: materialLoading } =
    useMaterialGroupPerformance(filters, materialInView);

  const materialTable = materialGroupPerformance?.table_data ?? [];
  const materialPie = materialGroupPerformance?.pie_chart ?? [];

  const { data: customerSegmentPerformance = {}, isLoading: customerLoading } =
    useCustomerSegmentPerformance(filters, customerInView);

  const customerTable = customerSegmentPerformance?.table_data ?? [];
  const customerPie = customerSegmentPerformance?.pie_chart ?? [];

  const { data: regionLineData } = useRegionLinePerformance(regionInView);
  const { data: brandLineData } = useBrandLinePerformance(brandInView);
  const { data: materialLineData } = useMaterialLinePerformance(materialInView);
  const { data: customerLineData } = useCustomerLinePerformance(customerInView);

  const regionLine = regionLineData?.Result?.line_chart ?? [];
  const brandLine = brandLineData?.Result?.line_chart ?? [];
  const materialLine = materialLineData?.Result?.line_chart ?? [];
  const customerLine = customerLineData?.Result?.line_chart ?? [];
  const monthMap: Record<string, string> = {
    Jan: "1",
    Feb: "2",
    Mar: "3",
    Apr: "4",
    May: "5",
    Jun: "6",
    Jul: "7",
    Aug: "8",
    Sep: "9",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const selectedMonthNumber = monthMap[selectedMonth || "Apr"];

  const { data: distributorData = [], isLoading: distributorLoading } =
    useDistributorChart(year, selectedMonthNumber);

  return (
    <div className="flex flex-1 flex-col  lg:px-2 py-4">
      <div className="flex flex-col space-y-4">
        {/* HEADER */}
        <DataTableHeader title="Sales Dashboard" />

        {/* FILTER */}
        <Card className="shadow-sm p-4">
          <MyForm
            onFilter={(data) => {
              if (!data) {
                setFilters(getDefaultFilters());
              } else {
                setFilters(data);
              }
            }}
          />
        </Card>

        {/* KPI CARDS */}
        <SectionCards filters={filters} />

        {/* TOP CHARTS */}
        <section className="grid grid-cols-1 lg:pe-2  lg:grid-cols-[38%_38%_24%] gap-1 items-stretch">
          {yearlyLoading ? (
            <ChartSkeleton />
          ) : (
            <div>
              <RainbowGlowGradientLineChart
                showYearSelector={true}
                height={220}
                title="Sales By Yearly Trends"
                description={`Sales overview for ${year}`}
                data={yearlyData}
                year={year}
                setYear={setYear}
              />
            </div>
          )}

          {monthlyLoading ? (
            <ChartSkeleton />
          ) : (
            <div>
              <AnimatedHighlightedAreaChart
                height={220}
                title="Sales By Monthly Trends"
                data={monthlyData}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                showMonthFilter={true} // ✅ ENABLE
              />
            </div>
          )}

          <div>
            <GaugePieChartCard />
          </div>
        </section>
        <section ref={distributorRef}>
          <DataTableSubHeader title="Target Overview" />

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-1 mt-4">
            <>
              {!distributorInView || distributorLoading ? (
                <ChartSkeleton />
              ) : (
                <AdvancedBarChart1
                  height={300}
                  data={distributorData || []} // ✅ API data
                  showFilter={true}
                  title="Distributor Target vs Achieved"
                  year={year}
                  month={selectedMonth || "Apr"}
                  sortType={sortType}
                  setYear={setYear}
                  setMonth={setSelectedMonth}
                  setSortType={setSortType}
                />
              )}
            </>
          </div>
        </section>

        {/* REGION */}
        <section ref={regionRef}>
          <DataTableSubHeader title="Region Performance" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mt-4">
            <>
              {/* ================= TABLE ================= */}
              {!regionInView || regionLoading ? (
                <TableSkeleton />
              ) : (
                <CommonDataTable
                  columns={performanceColumns}
                  data={regionTable}
                  pageSize={5}
                  title="Region Performance"
                />
              )}

              {/* ================= PIE ================= */}
              {!regionInView || regionLoading ? (
                <ChartSkeleton />
              ) : (
                <RoundedPieChart
                  title="Sales By Region Contribution"
                  data={regionPie}
                />
              )}

              {/* ================= LINE ================= */}
              {!regionInView ? (
                <ChartSkeleton />
              ) : regionLineData ? (
                <RainbowGlowGradientLineChart
                  xKey="label"
                  yKey="y"
                  title="Region Monthly Sales Trend"
                  data={regionLine}
                />
              ) : (
                <ChartSkeleton />
              )}
            </>
          </div>
        </section>

        {/* BRAND */}
        <section ref={brandRef}>
          <DataTableSubHeader title="Brand Performance " />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mt-4">
            <>
              {/* ================= TABLE ================= */}
              {!brandInView || brandLoading ? (
                <TableSkeleton />
              ) : (
                <CommonDataTable
                  columns={performanceColumns}
                  data={brandTable}
                  pageSize={5}
                  title="Brand Performance"
                />
              )}

              {/* ================= PIE ================= */}
              {!brandInView || brandLoading ? (
                <ChartSkeleton />
              ) : (
                <RoundedPieChart
                  title="Sales By Brand Contribution"
                  data={brandPie}
                />
              )}

              {/* ================= LINE ================= */}
              {!brandInView ? (
                <ChartSkeleton />
              ) : brandLineData ? (
                <RainbowGlowGradientLineChart
                  xKey="label"
                  yKey="y"
                  title="Brand Monthly Sales Trend"
                  data={brandLine}
                />
              ) : (
                <ChartSkeleton />
              )}
            </>
          </div>
        </section>

        {/* MATERIAL */}
        <section ref={materialRef}>
          <DataTableSubHeader title="Material Group" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mt-4">
            <>
              {/* ================= TABLE ================= */}
              {!materialInView || materialLoading ? (
                <TableSkeleton />
              ) : (
                <CommonDataTable
                  columns={performanceColumns}
                  data={materialTable}
                  pageSize={5}
                  title="Material Group"
                />
              )}

              {/* ================= PIE ================= */}
              {!materialInView || materialLoading ? (
                <ChartSkeleton />
              ) : (
                <RoundedPieChart
                  title="Sales By Material Group Contribution"
                  data={materialPie}
                />
              )}

              {/* ================= LINE ================= */}
              {!materialInView ? (
                <ChartSkeleton />
              ) : materialLineData ? (
                <RainbowGlowGradientLineChart
                  xKey="label"
                  yKey="y"
                  title="Material Group Monthly Sales Trend"
                  data={materialLine}
                />
              ) : (
                <ChartSkeleton />
              )}
            </>
          </div>
        </section>

        {/* CUSTOMER */}
        <section ref={customerRef}>
          <DataTableSubHeader title="Customer Segment Performance" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mt-4">
            <>
              {/* ================= TABLE ================= */}
              {!customerInView || customerLoading ? (
                <TableSkeleton />
              ) : (
                <CommonDataTable
                  columns={performanceColumns}
                  data={customerTable}
                  pageSize={5}
                  title="Customer Segment"
                />
              )}

              {/* ================= PIE ================= */}
              {!customerInView || customerLoading ? (
                <ChartSkeleton />
              ) : (
                <RoundedPieChart
                  title="Sales By Customer Segment Contribution"
                  data={customerPie}
                />
              )}

              {/* ================= LINE ================= */}
              {!customerInView ? (
                <ChartSkeleton />
              ) : customerLineData ? (
                <RainbowGlowGradientLineChart
                  xKey="label"
                  yKey="y"
                  title="Customer Segment Monthly Sales Trend"
                  data={customerLine}
                />
              ) : (
                <ChartSkeleton />
              )}
            </>
          </div>
        </section>
      </div>
    </div>
  );
}
