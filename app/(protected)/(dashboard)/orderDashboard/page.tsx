"use client";
import DataTableHeader from "@/components/table-data/data-table-header";
import MyForm from "./components/filter";
import { SectionCards } from "./components/section-cards";
import { GaugePieChartCard } from "@/components/ui/PieChartWithNeedle2";
import data from "./components/data.json";
import { Card } from "@/components/ui/card";
import { sectionColumns } from "./components/columns";
import { CommonDataTable } from "@/components/table-data/common-table";
import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line";
import { useMonthlyCompareDropSizeVolume } from "../routeDashboard/useRoutes";
import { SalesFilterPayload } from "../customerDashboard/types";
import { useState } from "react";
import { useTopCustomersTable } from "../customerDashboard/useCustomers";
import { performanceColumns } from "../customerDashboard/components/columns";
export default function Salesdashboa() {
  const [globalFilters, setGlobalFilters] = useState<SalesFilterPayload>({});
  // const [globalFilters, setGlobalFilters] = useState<SalesFilterPayload>({});

  // 🔹 Table-specific filters → pagination + table form
  const [tableFilters, setTableFilters] = useState<SalesFilterPayload>({
    page: 1,
    length: 10,
  });
  const { data: CompareDropSizeVolume = [], isLoading: volumeLoading } =
    useMonthlyCompareDropSizeVolume(globalFilters);

  const {
    data: tableDataRes,
    isLoading,
    isError,
  } = useTopCustomersTable(globalFilters);

  // Extract table data safely
  const tableData = tableDataRes?.tableData ?? [];
  // Extract pagination info from API
  const pagination = tableDataRes?.pagination;

  /* =========================
         PAGINATION HANDLERS (SERVER SIDE)
      ========================= */

  // 👉 Move to next page
  const handleNext = () => {
    if (pagination?.current_page < pagination?.total_pages) {
      setTableFilters((prev) => ({
        ...prev,
        page: pagination.current_page + 1,
      }));
    }
  };

  // 👉 Move to previous page
  const handlePrev = () => {
    if (pagination?.current_page > 1) {
      setTableFilters((prev) => ({
        ...prev,
        page: pagination.current_page - 1,
      }));
    }
  };
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col ">
          {/* PAGE HEADER */}
          <div className=" py-6 px-6">
            <DataTableHeader title="Orders Dashboard" />
          </div>
          {/* FILTERS */}

          <div className="lg:px-6 px-1 pb-4 ">
            <Card className="shadow-xm lg:px-5 ">
              {" "}
              <MyForm />
            </Card>
          </div>
          {/* TOP CHARTS */}
          <section className="grid gap-1 lg:px-5 px-1 pb-8 grid-cols-1 lg:grid-cols-[30%_40%_30%]">
            <SectionCards />
            <RainbowGlowGradientLineChart
              height={350}
              showYearSelector={false}
            />

            <div className="flex flex-col gap-2">
              <GaugePieChartCard />

              <RainbowGlowGradientLineChart
                height={150}
                showYearSelector={false}
                data={CompareDropSizeVolume}
                title="Drop Size by Volume"
              />
            </div>
          </section>
          <section className="lg:px-6 px-1  space-y-4">
            <CommonDataTable
              columns={performanceColumns}
              data={tableData}
              headerTitle="Top Customers"
              pagination={pagination}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </section>
        </div>
      </div>
    </>
  );
}
