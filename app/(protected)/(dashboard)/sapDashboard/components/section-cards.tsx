"use client";

import { motion } from "framer-motion";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const cardsData = [
  {
    title: "Asset Repair Cost Value",
    value: "0.00",
    message: "Total repair cost",
    color: "bg-rose-50",
  },
  {
    title: "Asset Total",
    value: "1",
    message: "Total number of assets",
    color: "bg-blue-50",
  },
  {
    title: "Asset Value",
    value: "0.00",
    message: "Total asset value",
    color: "bg-purple-50",
  },
  {
    title: "Asset Net Book Value",
    value: "0.00",
    message: "Current net book value",
    color: "bg-green-50",
  },
  {
    title: "Asset Repair Cost Value",
    value: "0.00",
    message: "Total repair cost",
    color: "bg-rose-50",
  },

  {
    title: "Asset Net Book Value",
    value: "0.00",
    message: "Current net book value",
    color: "bg-green-50",
  },
];

function AnimatedCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="transition-all duration-200 hover:shadow-xl rounded-lg"
    >
      {children}
    </motion.div>
  );
}

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cardsData.map((card, index) => (
        <AnimatedCard key={index}>
          <Card
            className={`p-4  hover:shadow-xl transition-all duration-300 rounded-xl border shadow-xm ${card.color}`}
          >
            <CardHeader className="p-2">
              <CardDescription className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardDescription>

              <CardTitle className="text-2xl font-bold tabular-nums tracking-tight">
                {card.value}
              </CardTitle>
            </CardHeader>

            <CardFooter className="text-sm text-muted-foreground p-2">
              {card.message}
            </CardFooter>
          </Card>
        </AnimatedCard>
      ))}
    </div>
  );
}
