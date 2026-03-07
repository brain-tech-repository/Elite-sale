"use client"
import DataTableHeader from "@/components/table-data/data-table-header";
import { SectionCards } from "./components/section-cards";
import DataTableSubHeader from "@/components/table-data/data-table-sub-header";
import { CommonDataTable } from "@/components/table-data/custom-table";
import { salesColumns } from "./components/columns"
import { RainbowGlowGradientLineCharts } from "@/components/ui/rainbow-glow-gradient-lines";
import { HighlightedMultipleBarChart } from "@/components/ui/highlighted-double-bar-chart";
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
            <DataTableHeader title="Asset Dashboard" />
          </div>

          {/* KPI CARDS */}
          <div className="px-6 pb-6">
            <SectionCards />
          </div>



          {/* SECTION 3 */}
          <div className="px-6 pb-10">
         
            <section className="grid gap-6 mt-4 grid-cols-1 lg:grid-cols-2">
             
                <HighlightedMultipleBarChart/>
            
              <HighlightedMultipleBarChart/>
               <HighlightedMultipleBarChart/>
            
              <HighlightedMultipleBarChart/>
               <HighlightedMultipleBarChart/>
            
              <HighlightedMultipleBarChart/>
               <HighlightedMultipleBarChart/>
            
             
            </section>
          </div>


        </div>
      </div>
    </>
  );
}