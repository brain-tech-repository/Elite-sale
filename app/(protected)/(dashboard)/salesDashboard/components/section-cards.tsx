"use client";
import { motion } from "framer-motion";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDashboardSummary } from "../useSales";
import { Skeleton } from "@/components/ui/skeleton";

// Utility to format numbers with commas (e.g., 1,000,000)
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-UG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

function AnimatedCard({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {children}
    </motion.div>
  );
}

interface Props {
  filters?: any;
}

export function SectionCards({ filters }: Props) {
  const { data, isLoading } = useDashboardSummary(filters);
  const result = data?.Result;

  const cardsData = [
    {
      title: "Today Sales",
      value: result?.today_sales ?? 0,
      color: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Total Sales",
      value: result?.total_sales ?? 0,
      color: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Today Collection",
      value: result?.today_collection ?? 0,
      color: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Total Collection",
      value: result?.total_collection ?? 0,
      color: "bg-indigo-50 dark:bg-indigo-900/20",
    },
    {
      title: "Today Return",
      value: result?.today_return ?? 0,
      color: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      title: "Total Return",
      value: result?.total_return ?? 0,
      color: "bg-rose-50 dark:bg-rose-900/20",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="p-4 space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-8 w-24" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
      {cardsData.map((card, index) => (
        <AnimatedCard key={index} index={index}>
          <Card className={`rounded-xl border-none shadow-sm ${card.color}`}>
            <CardHeader className="p-4 flex flex-col items-center lg:items-start space-y-1">
              <CardDescription className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                {card.title}
              </CardDescription>
              <CardTitle className="text-md whitespace-nowrap">
                <span className="text-xs  mr-1 text-gray-500">UGX</span>
                {formatCurrency(card.value)}
              </CardTitle>
            </CardHeader>
          </Card>
        </AnimatedCard>
      ))}
    </div>
  );
}
