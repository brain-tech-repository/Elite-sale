"use client";
import DataTableHeader from "@/components/table-data/data-table-header";
import MyForm from "./components/filter";
import { SectionCards } from "./components/section-cards";
import { RainbowGlowGradientLineChart } from "@/components/ui/rainbow-glow-gradient-line";
import DataTableSubHeader from "@/components/table-data/data-table-sub-header";
import { CommonDataTable } from "@/components/table-data/custom-table";
import { salesColumns } from "./components/columns";
import { Card } from "@/components/ui/card";
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
            <DataTableHeader title="Material Dashboard" />
          </div>
          {/* FILTERS */}
          <div className="lg:px-6 px-1 pb-4">
            <Card className="shadow-xm">
              {" "}
              <MyForm />
            </Card>
          </div>
          {/* KPI CARDS */}
          <div className="lg:px-6 px-1 pb-6">
            <SectionCards />
          </div>
          {/* TOP CHARTS */}
          {/* SECTION 2 */}
          <div className="lg:px-6 px-1 pb-8">
            <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-2">
              {/* Table 1 */}
              <div className="lg:col-span-1 space-y-2">
                <DataTableSubHeader
                  title="Top Material By Volume
"
                />
                <CommonDataTable
                  columns={salesColumns}
                  data={data}
                  pageSize={5}
                />
              </div>

              {/* Table 2 */}
              <div className="lg:col-span-1 space-y-2">
                <DataTableSubHeader title="Material Performance" />
                <CommonDataTable
                  columns={salesColumns}
                  data={data}
                  pageSize={5}
                />
              </div>
            </section>
          </div>
          {/* SECTION 3 */}
          <div className="lg:px-6 px-1 pb-10">
            <DataTableSubHeader title="Growth Analytics" />
            <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-1">
              <div className="lg:col-span-1">
                <CommonDataTable
                  columns={salesColumns}
                  data={data}
                  pageSize={5}
                />
              </div>
            </section>
          </div>
          <div className="lg:px-6 px-1 pb-10">
            <DataTableSubHeader title="Material Volume Growth" />
            <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-3">
              <RainbowGlowGradientLineChart />
              <RainbowGlowGradientLineChart />
              <RainbowGlowGradientLineChart />
            </section>
          </div>
          <div className="lg:px-6 px-1 pb-10">
            <DataTableSubHeader title="Material Volue Growth" />
            <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-3">
              <RainbowGlowGradientLineChart />
              <RainbowGlowGradientLineChart />
              <RainbowGlowGradientLineChart />
            </section>
          </div>

          <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-2">
            {/* Table 1 */}
            <div className="lg:col-span-1 space-y-2">
              <DataTableSubHeader
                title="Active SKUs (Last 2 Weeks)
"
              />
              <CommonDataTable
                columns={salesColumns}
                data={data}
                pageSize={5}
              />
            </div>
            {/* Table 2 */}
            <div className="lg:col-span-1 space-y-2">
              <DataTableSubHeader title="Inactive SKUs (Last 2 Weeks)" />
              <CommonDataTable
                columns={salesColumns}
                data={data}
                pageSize={5}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
