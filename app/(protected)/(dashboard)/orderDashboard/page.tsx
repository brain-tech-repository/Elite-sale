"use client";

import DataTableHeader from "@/components/table-data/data-table-header";
import MyForm from "./components/filter";
import { SectionCards } from "./components/section-cards";
import { GaugePieChartCard } from "@/components/ui/PieChartWithNeedle2";
import { Card } from "@/components/ui/card";
import { CommonDataTables } from "@/components/table-data/common-tables";
import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line";

import { useState } from "react";

// ❗ NEW TYPE
import { OrderSummaryFilters } from "./types";

// (Optional - keep if still needed)
import { useTopCustomersTable } from "../customerDashboard/useCustomers";

import { useOrderTable } from "./useOrder";
import { columns } from "./components/columns";

export default function Salesdashboa() {
  /* ================= GLOBAL FILTERS ================= */
  const [globalFilters, setGlobalFilters] = useState<OrderSummaryFilters>({});

  /* ================= TABLE FILTERS ================= */
  const [tableFilters, setTableFilters] = useState({
    page: 1,
    per_page: 10,
  });

  const { data, isLoading, isFetching } = useOrderTable({
    ...globalFilters,
    ...tableFilters,
  });

  /* ================= TABLE DATA ================= */

  const tableData = data?.data ?? [];
  const pagination = data?.pagination;

  /* ================= PAGINATION ================= */

  const handleNext = () => {
    if (!pagination) return;

    if (pagination.current_page < pagination.total_pages) {
      setTableFilters((prev) => ({
        ...prev,
        page: (prev.page ?? 1) + 1,
      }));
    }
  };

  const handlePrev = () => {
    if (!pagination) return;

    if (pagination.current_page > 1) {
      setTableFilters((prev) => ({
        ...prev,
        page: (prev.page ?? 1) - 1,
      }));
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col">
        {/* ================= HEADER ================= */}
        <div className="py-6 px-6">
          <DataTableHeader title="Orders Dashboard" />
        </div>

        {/* ================= FILTER ================= */}
        <div className="lg:px-6 px-1 pb-4">
          <Card className="shadow-xm lg:px-5">
            <MyForm onApply={(filters) => setGlobalFilters(filters)} />
          </Card>
        </div>

        {/* ================= TOP CARDS ================= */}
        <section className="grid gap-2 lg:px-5 px-1 pb-8 grid-cols-1 lg:grid-cols-[30%_40%_30%]">
          {/* ✅ UPDATED SUMMARY CARDS */}
          <SectionCards filters={globalFilters} />

          {/* (Optional static chart) */}
          <RainbowGlowGradientLineChart height={350} />

          <div className="flex flex-col gap-2">
            <GaugePieChartCard />

            {/* ⚠️ If you later create API for this → connect with filters */}
            <RainbowGlowGradientLineChart
              height={150}
              title="Drop Size by Volume"
            />
          </div>
        </section>

        {/* ================= TABLE ================= */}
        <section className="lg:px-6 px-1 space-y-4">
          <CommonDataTables
            columns={columns}
            data={tableData}
            headerTitle="Top Customers"
            pagination={pagination}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </section>
      </div>
    </div>
  );
}
