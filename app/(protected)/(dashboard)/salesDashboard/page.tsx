// "use client";
// import React from "react";
// /* UI COMPONENTS */
// import DataTableHeader from "@/components/table-data/data-table-header";
// import DataTableSubHeader from "@/components/table-data/data-table-sub-header";
// import { CommonDataTable } from "@/components/table-data/custom-table";
// import { Card } from "@/components/ui/card";
// import { RoundedPieChart } from "@/components/ui/rounded-pie-chart";
// import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line";
// import { AnimatedHighlightedAreaChart } from "@/components/ui/animated-highlighted-chart";
// /* SKELETON */
// import {
//   ChartSkeleton,
//   TableSkeleton,
// } from "@/components/ui/dashboard-skeleton";
// /* LOCAL */
// import MyForm from "./components/filter";
// import { SectionCards } from "./components/section-cards";
// import { performanceColumns } from "./components/columns";
// /* API */
// import {
//   useBrandLinePerformance,
//   useBrandPerformance,
//   useCustomerLinePerformance,
//   useCustomerSegmentPerformance,
//   useMaterialGroupPerformance,
//   useMaterialLinePerformance,
//   useMonthlySalesTrend,
//   useRegionLinePerformance,
//   useRegionPerformance,
//   useYearlySalesTrend,
// } from "./useSales";

// import { fallbackTableData } from "./components/data/fallback";
// // import { GaugeChart } from "@/components/ui/PieChartWithNeedle";
// import { GaugePieChartCard } from "@/components/ui/PieChartWithNeedle";
// import { AdvancedBarChart } from "@/components/ui/advancebar";
// import { AdvancedBarChart1 } from "@/components/ui/advancebar1";
// import { CommonDataTables } from "@/components/table-data/common-tables";
// export default function Salesdashboa() {
//   const [filters, setFilters] = React.useState<any>(null);
//   const [year, setYear] = React.useState("2026");
//   // Ensure this matches the string format your API/chart expects (e.g., "January")
//   const [selectedMonth, setSelectedMonth] = React.useState<string | null>(
//     "January",
//   );

//   /* ============================================================
//    📌 SALES TREND (Charts - Top Section)
// ============================================================ */

//   const { data: monthlyData = [], isLoading: monthlyLoading } =
//     useMonthlySalesTrend(year, selectedMonth, filters);

//   const { data: yearlyData = [], isLoading: yearlyLoading } =
//     useYearlySalesTrend(year, filters);

//   /* ============================================================
//    📌 PAGINATION STATE (All Tables)
// ============================================================ */

//   const [regionPage, setRegionPage] = React.useState(1);
//   const [brandPage, setBrandPage] = React.useState(1);
//   const [materialPage, setMaterialPage] = React.useState(1);
//   const [customerPage, setCustomerPage] = React.useState(1);

//   /* ============================================================
//    📌 PAGE LOADING CONTROL (Skeleton only for tables)
// ============================================================ */

//   const [isRegionPageChanging, setIsRegionPageChanging] = React.useState(false);
//   const [isBrandPageChanging, setIsBrandPageChanging] = React.useState(false);
//   const [isMaterialPageChanging, setIsMaterialPageChanging] =
//     React.useState(false);
//   const [isCustomerPageChanging, setIsCustomerPageChanging] =
//     React.useState(false);

//   /* ============================================================
//    📌 PERFORMANCE DATA (Server Pagination APIs)
// ============================================================ */

//   // 🔵 Region
//   const { data: regionPerformance, isLoading: regionLoading } =
//     useRegionPerformance(filters, regionPage);

//   const regionTable = regionPerformance?.table_data ?? [];
//   const regionPagination = regionPerformance?.pagination ?? {};

//   // 🟣 Brand
//   const { data: brandPerformance, isLoading: brandLoading } =
//     useBrandPerformance(filters, brandPage);

//   const brandTable = brandPerformance?.table_data ?? [];
//   const brandPagination = brandPerformance?.pagination ?? {};

//   // 🟢 Material
//   const { data: materialGroupPerformance, isLoading: materialLoading } =
//     useMaterialGroupPerformance(filters, materialPage);

//   const materialTable = materialGroupPerformance?.table_data ?? [];
//   const materialPagination = materialGroupPerformance?.pagination ?? {};

//   // 🟡 Customer
//   const { data: customerPerformance, isLoading: customerLoading } =
//     useCustomerSegmentPerformance(filters, customerPage);

//   const customerTable = customerPerformance?.table_data ?? [];
//   const customerPagination = customerPerformance?.pagination ?? {};

//   /* ============================================================
//    📌 CHART DATA (Derived from API)
// ============================================================ */

//   // Pie Charts
//   const regionPie = regionPerformance?.pie_chart ?? [];
//   const brandPie = brandPerformance?.pie_chart ?? [];
//   const materialPie = materialGroupPerformance?.pie_chart ?? [];
//   const customerPie = customerPerformance?.pie_chart ?? [];

//   // Line Charts
//   const { data: regionLineData } = useRegionLinePerformance();
//   const { data: brandLineData } = useBrandLinePerformance();
//   const { data: materialLineData } = useMaterialLinePerformance();
//   const { data: customerLineData } = useCustomerLinePerformance();

//   const regionLine = regionLineData?.Result?.line_chart ?? [];
//   const brandLine = brandLineData?.Result?.line_chart ?? [];
//   const materialLine = materialLineData?.Result?.line_chart ?? [];
//   const customerLine = customerLineData?.Result?.line_chart ?? [];

//   /* ============================================================
//    📌 TRANSFORMED DATA (Monthly Chart Format)
// ============================================================ */

//   const formattedData = (monthlyData || []).map((item: any) => ({
//     month: item.month ?? "",
//     pv: Number(item.desktop ?? 0),
//     uv: Number(item.desktop ?? 0),
//   }));

//   /* ============================================================
//    📌 RESET PAGE LOADING (After Data Loads)
// ============================================================ */

//   React.useEffect(() => {
//     setIsRegionPageChanging(false);
//   }, [regionPerformance]);

//   React.useEffect(() => {
//     setIsBrandPageChanging(false);
//   }, [brandPerformance]);

//   React.useEffect(() => {
//     setIsMaterialPageChanging(false);
//   }, [materialGroupPerformance]);

//   React.useEffect(() => {
//     setIsCustomerPageChanging(false);
//   }, [customerPerformance]);

//   React.useEffect(() => {
//     setRegionPage(1);
//     setBrandPage(1);
//     setMaterialPage(1);
//     setCustomerPage(1);
//   }, [filters]);

//   return (
//     <div className="flex flex-1 flex-col  lg:px-2 py-4">
//       <div className="flex flex-col space-y-4">
//         {/* HEADER */}
//         <DataTableHeader title="Sales Dashboard" />

//         {/* FILTER */}
//         <Card className="shadow-sm p-4">
//           <MyForm onFilter={setFilters} />
//         </Card>

//         {/* KPI CARDS */}
//         <SectionCards filters={filters} />

//         {/* TOP CHARTS */}
//         <section className="grid grid-cols-1 lg:pe-2  lg:grid-cols-[38%_38%_24%] gap-1 items-stretch">
//           {yearlyLoading ? (
//             <ChartSkeleton />
//           ) : (
//             <div>
//               <RainbowGlowGradientLineChart
//                 showYearSelector={true}
//                 height={220}
//                 title="Sales By Yearly Trends"
//                 description={`Sales overview for ${year}`}
//                 data={yearlyData}
//                 year={year}
//                 setYear={setYear}
//               />
//             </div>
//           )}

//           {monthlyLoading ? (
//             <ChartSkeleton />
//           ) : (
//             <div>
//               <AnimatedHighlightedAreaChart
//                 height={220}
//                 title="Sales By Monthly Trends"
//                 data={monthlyData}
//                 selectedMonth={selectedMonth}
//                 setSelectedMonth={setSelectedMonth}
//                 showMonthFilter={true}
//               />
//             </div>
//           )}

//           <div>
//             <GaugePieChartCard />
//           </div>
//         </section>
//         <section>
//           <DataTableSubHeader title="Target Overview" />
//           <div className="grid grid-cols-1 lg:grid-cols-1 gap-1 mt-4">
//             <>
//               {/* LINE → ALWAYS SHOW (NO loading) */}
//               <AdvancedBarChart1 height={300} />
//             </>
//           </div>
//         </section>

//         {/* REGION */}
//         <section>
//           <DataTableSubHeader title="Region Performance" />
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mt-4">
//             <>
//               {regionLoading ? (
//                 <TableSkeleton />
//               ) : (
//                 <CommonDataTables
//                   columns={performanceColumns}
//                   data={regionTable}
//                   pageSize={5}
//                   // currentPage={regionPagination?.current_page || 1}
//                   // totalPages={regionPagination?.total_pages || 1}
//                   // onPageChange={(page) => {
//                   //   setIsRegionPageChanging(true);
//                   //   setRegionPage(page);
//                   // }}
//                   // isFetching={isRegionPageChanging} // ✅ PASS THIS
//                 />
//               )}

//               {/* PIE */}
//               {regionPerformance ? (
//                 <RoundedPieChart
//                   title="Sales By Region Contribution"
//                   data={regionPie}
//                 />
//               ) : (
//                 <ChartSkeleton />
//               )}

//               {/* LINE → ALWAYS SHOW (NO loading) */}
//               {regionLineData ? (
//                 <RainbowGlowGradientLineChart
//                   xKey="label"
//                   yKey="y"
//                   title="Region Monthly Sales Trend"
//                   data={regionLine}
//                 />
//               ) : (
//                 <ChartSkeleton />
//               )}
//             </>
//           </div>
//         </section>

//         {/* BRAND */}
//         <section>
//           <DataTableSubHeader title="Brand Performance " />
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mt-4">
//             <>
//               {/* TABLE */}
//               {brandLoading ? (
//                 <TableSkeleton />
//               ) : (
//                 <CommonDataTable
//                   columns={performanceColumns}
//                   data={brandTable}
//                   pageSize={5}
//                   currentPage={brandPagination?.current_page || 1}
//                   totalPages={brandPagination?.total_pages || 1}
//                   onPageChange={(page) => {
//                     setIsBrandPageChanging(true);
//                     setBrandPage(page);
//                   }}
//                   isFetching={isBrandPageChanging} // ✅ ADD THIS
//                 />
//               )}

//               {/* PIE */}
//               {brandPerformance ? (
//                 <RoundedPieChart
//                   title="Sales By Brand Contribution"
//                   data={brandPie}
//                 />
//               ) : (
//                 <ChartSkeleton />
//               )}

//               {/* LINE */}
//               {brandLineData ? (
//                 <RainbowGlowGradientLineChart
//                   xKey="label"
//                   yKey="y"
//                   title="Brand Monthly Sales Trend"
//                   data={brandLine}
//                 />
//               ) : (
//                 <ChartSkeleton />
//               )}
//             </>
//           </div>
//         </section>

//         {/* MATERIAL */}
//         <section>
//           <DataTableSubHeader title="Material Group" />
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mt-4">
//             <>
//               {/* TABLE */}
//               {materialLoading ? (
//                 <TableSkeleton />
//               ) : (
//                 <CommonDataTable
//                   columns={performanceColumns}
//                   data={materialTable}
//                   title="Material Group"
//                   pageSize={5}
//                   currentPage={materialPagination?.current_page || 1}
//                   totalPages={materialPagination?.total_pages || 1}
//                   onPageChange={(page) => {
//                     setIsMaterialPageChanging(true);
//                     setMaterialPage(page);
//                   }}
//                   isFetching={isMaterialPageChanging} // ✅ ADD
//                 />
//               )}

//               {/* PIE */}
//               {materialGroupPerformance ? (
//                 <RoundedPieChart
//                   title="Sales By Material Group Contribution"
//                   data={materialPie}
//                 />
//               ) : (
//                 <ChartSkeleton />
//               )}

//               {/* LINE */}
//               {materialLineData ? (
//                 <RainbowGlowGradientLineChart
//                   xKey="label"
//                   yKey="y"
//                   title="Material Group Monthly Sales Trend"
//                   data={materialLine}
//                 />
//               ) : (
//                 <ChartSkeleton />
//               )}
//             </>
//           </div>
//         </section>

//         {/* CUSTOMER */}
//         <section>
//           <DataTableSubHeader title="Customer Segment Performance" />
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mt-4">
//             <>
//               {/* TABLE */}
//               {customerLoading ? (
//                 <TableSkeleton />
//               ) : (
//                 <CommonDataTable
//                   columns={performanceColumns}
//                   data={customerTable}
//                   pageSize={5}
//                   currentPage={customerPagination?.current_page || 1}
//                   totalPages={customerPagination?.total_pages || 1}
//                   onPageChange={(page) => {
//                     setIsCustomerPageChanging(true);
//                     setCustomerPage(page);
//                   }}
//                   isFetching={isCustomerPageChanging} // ✅ ADD
//                 />
//               )}

//               {/* PIE */}
//               {customerPerformance ? (
//                 <RoundedPieChart
//                   title="Sales By Customer Segment Contribution"
//                   data={customerPie}
//                 />
//               ) : (
//                 <ChartSkeleton />
//               )}

//               {/* LINE */}
//               {customerLineData ? (
//                 <RainbowGlowGradientLineChart
//                   xKey="label"
//                   yKey="y"
//                   title="Customer Segment Monthly Sales Trend"
//                   data={customerLine}
//                 />
//               ) : (
//                 <ChartSkeleton />
//               )}
//             </>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

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
  const [selectedMonth, setSelectedMonth] = React.useState<string | null>(
    "April",
  );
  /* SALES TREND */
  const { data: monthlyData = [], isLoading: monthlyLoading } =
    useMonthlySalesTrend(year, selectedMonth, filters);

  const { data: yearlyData = [], isLoading: yearlyLoading } =
    useYearlySalesTrend(year, filters);

  /* PERFORMANCE */

  const { data: regionPerformance = {}, isLoading: regionLoading } =
    useRegionPerformance(filters);
  const regionTable = regionPerformance?.table_data ?? [];
  const regionPie = regionPerformance?.pie_chart ?? [];

  const { data: brandPerformance = {}, isLoading: brandLoading } =
    useBrandPerformance(filters);
  const brandTable = brandPerformance?.table_data ?? [];
  const brandPie = brandPerformance?.pie_chart ?? [];

  const { data: materialGroupPerformance = {}, isLoading: materialLoading } =
    useMaterialGroupPerformance(filters);
  const materialTable = materialGroupPerformance?.table_data ?? [];
  const materialPie = materialGroupPerformance?.pie_chart ?? [];

  const { data: customerSegmentPerformance = {}, isLoading: customerLoading } =
    useCustomerSegmentPerformance(filters);
  const customerTable = customerSegmentPerformance?.table_data ?? [];
  const customerPie = customerSegmentPerformance?.pie_chart ?? [];

  const { data: regionLineData } = useRegionLinePerformance();
  const { data: brandLineData } = useBrandLinePerformance();
  const { data: materialLineData } = useMaterialLinePerformance();
  const { data: customerLineData } = useCustomerLinePerformance();

  const regionLine = regionLineData?.Result?.line_chart ?? [];
  const brandLine = brandLineData?.Result?.line_chart ?? [];
  const materialLine = materialLineData?.Result?.line_chart ?? [];
  const customerLine = customerLineData?.Result?.line_chart ?? [];

  const formattedData = (monthlyData || []).map((item: any) => ({
    month: item.month ?? "",
    pv: Number(item.desktop ?? 0),
    uv: Number(item.desktop ?? 0),
  }));

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
        <section>
          <DataTableSubHeader title="Target Overview" />
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-1 mt-4">
            <>
              {/* LINE → ALWAYS SHOW (NO loading) */}
              <AdvancedBarChart1 height={300} />
            </>
          </div>
        </section>

        {/* REGION */}
        <section>
          <DataTableSubHeader title="Region Performance" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mt-4">
            <>
              {/* TABLE */}
              {regionLoading ? (
                <TableSkeleton />
              ) : (
                <CommonDataTable
                  columns={performanceColumns}
                  data={regionTable}
                  pageSize={5}
                  title="Region Performance"
                />
              )}

              {/* PIE */}
              {regionLoading ? (
                <ChartSkeleton />
              ) : (
                <RoundedPieChart
                  title="Sales By Region Contribution"
                  data={regionPie}
                />
              )}

              {/* LINE → ALWAYS SHOW (NO loading) */}
              {regionLineData ? (
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
        <section>
          <DataTableSubHeader title="Brand Performance " />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mt-4">
            <>
              {/* TABLE */}
              {brandLoading ? (
                <TableSkeleton />
              ) : (
                <CommonDataTable
                  columns={performanceColumns}
                  data={brandTable}
                  pageSize={5}
                  title="Brand Performance"
                />
              )}

              {/* PIE */}
              {brandLoading ? (
                <ChartSkeleton />
              ) : (
                <RoundedPieChart
                  title="Sales By Brand Contribution"
                  data={brandPie}
                />
              )}

              {/* LINE */}
              {brandLineData ? (
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
        <section>
          <DataTableSubHeader title="Material Group" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mt-4">
            <>
              {/* TABLE */}
              {materialLoading ? (
                <TableSkeleton />
              ) : (
                <CommonDataTable
                  columns={performanceColumns}
                  data={materialTable}
                  pageSize={5}
                  title="Material Group"
                />
              )}

              {/* PIE */}
              {materialLoading ? (
                <ChartSkeleton />
              ) : (
                <RoundedPieChart
                  title="Sales By Material Group Contribution"
                  data={materialPie}
                />
              )}

              {/* LINE */}
              {materialLineData ? (
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
        <section>
          <DataTableSubHeader title="Customer Segment Performance" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mt-4">
            <>
              {/* TABLE */}
              {customerLoading ? (
                <TableSkeleton />
              ) : (
                <CommonDataTable
                  columns={performanceColumns}
                  data={customerTable}
                  pageSize={5}
                  title="Customer Segment"
                />
              )}

              {/* PIE */}
              {customerLoading ? (
                <ChartSkeleton />
              ) : (
                <RoundedPieChart
                  title="Sales By Customer Segment Contribution"
                  data={customerPie}
                />
              )}

              {/* LINE */}
              {customerLineData ? (
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
