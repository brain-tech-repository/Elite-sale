"use client";

import { motion } from "framer-motion";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/* =========================
   DATA
========================= */

const cardsData = [
  {
    title: "New Customers",
    value: "1,234",
    trend: -20,
    gradient: "from-[#0f2027] via-[#203a43] to-[#2c5364]",
  },
  {
    title: "Return Customers",
    value: "123",
    trend: -20,
    gradient: "from-[#134E5E] to-[#71B280]",
  },
  {
    title: "Active Accounts",
    value: "4,567",
    trend: 1.5,
    gradient: "bg-gradient-to-r from-[#1E6C8E] to-[#2E7775] text-white",
  },
  {
    title: "Growth Rate",
    value: "4.5%",
    trend: 4.5,
    gradient: "bg-gradient-to-r from-[#243748] to-[#4B749F] text-white",
  },
];

/* =========================
   ANIMATION
========================= */

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
      transition={{ delay: index * 0.05 }}
    >
      {children}
    </motion.div>
  );
}

/* =========================
   COMPONENT
========================= */

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {cardsData.map((card, index) => {
        const isPositive = card.trend > 0;
        const TrendIcon = isPositive ? IconTrendingUp : IconTrendingDown;

        return (
          <AnimatedCard key={index} index={index}>
            <Card
              className={`rounded-xl border-none shadow-xm p-3 text-white 
              bg-gradient-to-r ${card.gradient}`}
            >
              <CardHeader className="p-1 flex flex-col gap-1">
                {/* Title */}
                <CardDescription className="text-xs uppercase tracking-wide text-white/80">
                  {card.title}
                </CardDescription>
                {/* Value */}
                <CardTitle className="text-lg font-semibold">
                  {card.value}
                </CardTitle>
                {/* Trend Badge */}
                {/* <div className="flex justify-end">
                  <Badge
                    variant="secondary"
                    className={`text-[10px] px-2 py-[2px] flex items-center gap-1
                      ${
                        isPositive
                          ? "bg-green-500/20 text-green-200"
                          : "bg-red-500/20 text-red-200"
                      }`}
                  >
                    <TrendIcon className="size-3" />
                    {card.trend > 0 ? "+" : ""}
                    {card.trend}%
                  </Badge>
                </div> */}
              </CardHeader>
            </Card>
          </AnimatedCard>
        );
      })}
    </div>
  );
}
