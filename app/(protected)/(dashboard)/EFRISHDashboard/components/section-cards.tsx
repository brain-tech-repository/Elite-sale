"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const cardsData = [
  {
    title: "URA Live Date",
    value: "17-06-2024",
    color: "bg-gradient-to-r from-[#0F2027] to-[#2C5364]",
  },
  {
    title: "Pending Route Invoice",
    value: 840,
    color: "bg-gradient-to-r from-[#1E6C8E] to-[#2E7775]",
  },

  {
    title: "Pending Stock Adjustment",
    value: 80,
    color: "bg-gradient-to-r from-[#042f2e] to-[#14b8a6]",
  },
  {
    title: "Sync Stock Adjustment",
    value: 3,
    color: "bg-gradient-to-r from-[#09203f] to-[#537895]",
  },
  {
    title: "Pending GRN",
    value: 19,
    color: "bg-gradient-to-r from-[#020617] to-[#155e75]",
  },

  {
    title: "Sync Route Return",
    value: 0,
    color: "bg-gradient-to-r from-[#134e4a] to-[#115e59]",
  },
  {
    title: "Pending Counter Sale",
    value: 62,
    color: "bg-gradient-to-r from-[#3f3f46] to-[#27272a]",
  },

  {
    title: "Pending Sales Invoice",
    value: 17,
    color: "bg-gradient-to-r from-[#1f2937] to-[#111827]",
  },
  {
    title: "Sync Sales Invoice",
    value: 0,
    color: "bg-gradient-to-r from-[#022c22] to-[#134e4a]",
  },
  {
    title: "Sync Order Return",
    value: 0,
    color: "bg-gradient-to-r from-[#083344] to-[#155e75]",
  },
  {
    title: "Pending Order Return",
    value: 5,
    color: "bg-gradient-to-r from-[#062c30] to-[#0f766e]",
  },

  {
    title: "Sync Order Return",
    value: 0,
    color: "bg-gradient-to-r from-[#021617] to-[#0f766e]",
  },
  {
    title: "Sync Counter Sale",
    value: 0,
    color: "bg-gradient-to-r from-[#083344] to-[#155e75]",
  },
  {
    title: "Sync Sales Invoice",
    value: 0,
    color: "bg-gradient-to-r from-[#022c22] to-[#134e4a]",
  },
  {
    title: "Sync Route Invoice",
    value: 6,
    color: "bg-gradient-to-r from-[#031e2f] to-[#0e7490]",
  },
];

function AnimatedCard({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ scale: 1.03 }}
    >
      {children}
    </motion.div>
  );
}

const formatNumber = (num: number) =>
  new Intl.NumberFormat("en-IN").format(num);

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
      {cardsData.map((card, index) => (
        <AnimatedCard key={index} index={index}>
          <Card
            className={`rounded-xl border-none shadow-md p-4 ${
              card.color
            } ${card ?? "text-white"}`}
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
  );
}
