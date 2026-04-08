"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton"; // Optional: UI loading state
import { DashboardStatsResponse } from "../types";
import {
  usePendingRouteInvoices,
  usePendingStockAdjustment,
  useSyncRouteInvoices,
  useSyncStockAdjustment,
} from "../usEfris";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Ensure you have Shadcn Dialog installed
import { CommonDataTables } from "@/components/table-data/common-tables";
import { DynamicDialog } from "./DynamicDialog";
import {
  pendingInvoiceColumns,
  stockAdjustmentColumns,
  stockAdjustmentsyncColumns,
} from "./columns";

type SectionCardsProps = {
  data?: DashboardStatsResponse; // Better typing for your data
  isLoading: boolean;
  isError: boolean;
  filters?: any; // Add filters here
};
function AnimatedCard({
  children,
  index,
  onClick,
}: {
  children: React.ReactNode;
  index: number;
  onClick?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

const formatNumber = (num: number) =>
  new Intl.NumberFormat("en-IN").format(num);

export function SectionCards({
  data,
  isLoading,
  isError,
  filters,
}: SectionCardsProps) {
  // Mapping API data to your UI structure

  const [activeModal, setActiveModal] = useState<
    | "pending_invoice"
    | "stock_adjustment"
    | "stock_sync_adjustment"
    | "sync_route_invoice"
    | null
  >(null);

  const cardsData = [
    {
      title: "URA Live Date",
      value: "17-06-2024",
      color: "bg-gradient-to-r from-[#0F2027] to-[#2C5364]",
    },
    {
      title: "Pending Route Invoice",
      value: data?.total_pending_efris_invoice ?? 0,
      color: "bg-gradient-to-r from-[#1E6C8E] to-[#2E7775]",
      onClick: () => setActiveModal("pending_invoice"),
    },
    {
      title: "Sync Route Invoice",
      value: data?.total_sync_efris_invoice ?? 0,
      color: "bg-gradient-to-r from-[#031e2f] to-[#0e7490]",
      onClick: () => setActiveModal("sync_route_invoice"),
    },
    {
      title: "Pending Stock Adjustment",
      value: data?.total_stock_adjustment_pending ?? 0,
      color: "bg-gradient-to-r from-[#042f2e] to-[#14b8a6]",
      onClick: () => setActiveModal("stock_adjustment"),
    },
    {
      title: "Sync Stock Adjustment",
      value: data?.total_stock_adjustment ?? 0,
      color: "bg-gradient-to-r from-[#09203f] to-[#537895]",
      onClick: () => setActiveModal("stock_sync_adjustment"),
    },
    {
      title: "Pending GRN",
      value: data?.total_pending_grn ?? 0,
      color: "bg-gradient-to-r from-[#020617] to-[#155e75]",
    },
    {
      title: "Sync GRN",
      value: data?.total_sync_grn ?? 0,
      color: "bg-gradient-to-r from-[#134e4a] to-[#115e59]",
    },
    {
      title: "Pending Route Return",
      value: data?.total_pending_route_return ?? 0,
      color: "bg-gradient-to-r from-[#1f2937] to-[#111827]",
    },
    {
      title: "Sync Route Return",
      value: data?.total_sync_route_return ?? 0,
      color: "bg-gradient-to-r from-[#134e4a] to-[#115e59]",
    },
    {
      title: "Pending Counter Sale",
      value: data?.total_pending_counter_sales ?? 0,
      color: "bg-gradient-to-r from-[#022c22] to-[#134e4a]",
    },
    {
      title: "Sync Counter Sale",
      value: data?.total_sync_counter_sales ?? 0,
      color: "bg-gradient-to-r from-[#083344] to-[#155e75]",
    },
    {
      title: "Pending Sales Invoice",
      value: data?.total_pending_sales_invoice,
      color: "bg-gradient-to-r from-[#022c22] to-[#134e4a]",
    },
    {
      title: "Sync Sales Invoice",
      value: data?.total_sync_sales_invoice,
      color: "bg-gradient-to-r from-[#083344] to-[#155e75]",
    },
    {
      title: "Pending Order Return",
      value: data?.total_pending_order_return,
      color: "bg-gradient-to-r from-[#062c30] to-[#0f766e]",
    },
    {
      title: "Sync Order Return",
      value: data?.total_sync_order_return,
      color: "bg-gradient-to-r from-[#021617] to-[#0f766e]",
    },
  ];
  const { data: invoiceData = [], isFetching: isFetchingInvoice } =
    usePendingRouteInvoices(filters, activeModal === "pending_invoice");

  const { data: stocSynckData = [], isFetching: isFetchingSyncStock } =
    useSyncStockAdjustment(filters, activeModal === "stock_sync_adjustment");

  const { data: stockData = [], isFetching: isFetchingStock } =
    usePendingStockAdjustment(filters, activeModal === "stock_adjustment");

  const { data: syncInvoiceData = [], isFetching: isFetchingSyncInvoice } =
    useSyncRouteInvoices(filters, activeModal === "sync_route_invoice");

  const modalConfig = {
    pending_invoice: {
      title: "Pending Route Invoices Details",
      columns: pendingInvoiceColumns,
      data: invoiceData,
      isFetching: isFetchingInvoice,
    },
    stock_sync_adjustment: {
      title: "Sync Stock Adjustment Details",
      columns: stockAdjustmentsyncColumns,
      data: stocSynckData,
      isFetching: isFetchingSyncStock,
    },
    stock_adjustment: {
      title: "Pending Stock Adjustment Details",
      columns: stockAdjustmentColumns,
      data: stockData,
      isFetching: isFetchingStock,
    },
    sync_route_invoice: {
      title: "Sync Route Invoice Details",
      columns: pendingInvoiceColumns, // or create new columns if needed
      data: syncInvoiceData,
      isFetching: isFetchingSyncInvoice,
    },
  };

  if (isLoading) {
    return (
      <Card className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
          <Card key={i} className="p-4 space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-8 w-24" />
          </Card>
        ))}
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
        {cardsData.map((card, index) => (
          <AnimatedCard
            key={`${card.title}-${index}`}
            index={index}
            onClick={card.onClick}
          >
            <Card
              className={`rounded-xl border-none shadow-md p-4 ${card.color} text-white`}
            >
              <CardHeader className="px-2 flex flex-col gap-1">
                <CardDescription className="text-xs font-semibold uppercase tracking-wide opacity-80 text-white">
                  {card.title}
                </CardDescription>

                <CardTitle className="text-sm font-bold text-white">
                  {typeof card.value === "number"
                    ? formatNumber(card.value)
                    : card.value}
                </CardTitle>
              </CardHeader>
            </Card>
          </AnimatedCard>
        ))}
      </div>
      <DynamicDialog
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        modalConfig={modalConfig}
      />
    </>
  );
}
