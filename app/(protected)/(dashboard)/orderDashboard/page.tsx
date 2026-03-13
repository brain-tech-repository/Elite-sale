"use client";
import DataTableHeader from "@/components/table-data/data-table-header";
import MyForm from "./components/filter";
import { SectionCards } from "./components/section-cards";
import { GaugePieChartCard } from "@/components/ui/PieChartWithNeedle";
import data from "./components/data.json";
import { Card } from "@/components/ui/card";
import { sectionColumns } from "./components/columns";
import { CommonDataTable } from "@/components/table-data/common-table";
import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line";
export default function Salesdashboa() {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col ">
          {/* PAGE HEADER */}
          <div className=" py-6">
            <DataTableHeader title="Orders Dashboard" />
          </div>
          {/* FILTERS */}

          <div className="lg:px-6 px-1 pb-4 ">
            <Card className="shadow-sm lg:px-5 ">
              {" "}
              <MyForm />
            </Card>
          </div>
          {/* TOP CHARTS */}
          <section className="grid gap-6 lg:px-6 px-1 pb-8 grid-cols-1 lg:grid-cols-3">
            <SectionCards />
            <RainbowGlowGradientLineChart />
            <GaugePieChartCard />
          </section>
          <section className="lg:px-6 px-1 pb-10 space-y-4">
            <div className="lg:col-span-1">
              <Card className="shadow-sm py-2">
                <CommonDataTable
                  columns={sectionColumns}
                  data={data}
                  pageSize={5}
                  headerTitle="Orders Data"
                />
              </Card>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
