"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
      transition={{ delay: index * 0.08 }}
    >
      {children}
    </motion.div>
  );
}

export function SectionCards() {
  const statsData = [
    {
      title: "Total Routes",
      value: 69,
      color: "bg-gradient-to-r from-[#1E6C8E] to-[#2E7775] text-white",

      //
    },
    {
      title: "Total Salesmans",
      value: 74,
      color: "bg-gradient-to-r from-[#243748] to-[#4B749F] text-white",
    },
    {
      title: "Total Customers",
      value: 8622,
      color: "bg-gradient-to-r from-[#134E5E] to-[#71B280]",
    },
    {
      title: "Avg. Customers / Route",
      value: 125,
      color: "bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((card, index) => (
        <AnimatedCard key={index} index={index}>
          <Card
            className={`rounded-xl border-none shadow-md hover:shadow-xl transition-all duration-300 text-white ${card.color}`}
          >
            <CardHeader className="flex flex-col gap-2 px-4">
              <CardDescription className="text-xs uppercase tracking-wide text-white/80">
                {card.title}
              </CardDescription>

              <CardTitle className="text-2xl font-bold">
                {card.value.toLocaleString("en-IN")}
              </CardTitle>
            </CardHeader>
          </Card>
        </AnimatedCard>
      ))}
    </div>
  );
}
