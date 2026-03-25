"use client";

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const cardsData = [
  {
    title: "New Customers",
    value: "1,234",
    trend: -20,
    message: "Needs attention",
    footer: "Down 20%",
    color: "bg-blue-50",
  },
  {
    title: "Returning Customers",
    value: "1,234",
    trend: -20,
    message: "Needs attention",
    footer: "Down 20%",
    color: "bg-purple-50",
  },
  {
    title: "Active Accounts",
    value: "45,678",
    trend: 12.5,
    message: "Exceeds target",
    footer: "Strong retention",
    color: "bg-green-50",
  },
  {
    title: "Growth Rate",
    value: "4.5%",
    trend: 4.5,
    message: "Meets projection",
    footer: "Steady increase",
    color: "bg-indigo-50",
  },
  {
    title: "Orders Sales",
    value: "2,890",
    trend: 8,
    message: "This quarter",
    footer: "Increasing sales",
    color: "bg-amber-50",
  },
  {
    title: "Refund Rate",
    value: "1.2%",
    trend: -2,
    message: "Improved quality",
    footer: "Lower refunds",
    color: "bg-rose-50",
  },
  {
    title: "Total Revenue",
    value: "$98,450",
    trend: 10,
    message: "Revenue growth",
    footer: "Up this month",
    color: "bg-emerald-50",
  },
  {
    title: "Pending Orders",
    value: "320",
    trend: 5,
    message: "Orders processing",
    footer: "Slight increase",
    color: "bg-yellow-50",
  },
];

function AnimatedCard({ children }: { children: React.ReactNode }) {
  const controls = useAnimation();
  const [hovered, setHovered] = useState(false);

  const handleHoverStart = async () => {
    setHovered(true);
    await controls.start({
      rotateY: 360,
      transition: { duration: 1.8, ease: "easeInOut" },
    });
    controls.set({ rotateY: 0 });
  };

  const handleHoverEnd = () => {
    setHovered(false);
    controls.stop();
    controls.set({ rotateY: 0 });
  };

  return (
    <motion.div
    // style={{ perspective: 1000 }}
    // animate={controls}
    // onHoverStart={handleHoverStart}
    // onHoverEnd={handleHoverEnd}
    // whileHover={{ scale: 1.04 }}
    // className="transition-shadow hover:shadow-xl rounded-xl"
    >
      {children}
    </motion.div>
  );
}

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cardsData.map((card, index) => {
        const isPositive = card.trend > 0;
        const TrendIcon = isPositive ? IconTrendingUp : IconTrendingDown;

        return (
          <AnimatedCard key={index}>
            <Card
              className={`p-3 rounded-xl border shadow-xm hover:shadow-xl transition-all shadow-xm ${card.color}`}
            >
              <CardHeader className="p-0 space-y-1">
                <CardDescription className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardDescription>

                <CardTitle className="text-3xl font-bold tabular-nums">
                  {card.value}
                </CardTitle>
              </CardHeader>

              <CardFooter className="flex flex-col items-start gap-2 text-sm mt-1 p-0">
                <div
                  className={`flex items-center gap-1 font-semibold ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <TrendIcon className="size-4" />
                  {card.trend > 0 ? "+" : ""}
                  {card.trend}%
                </div>

                <div className="text-muted-foreground text-xs">
                  {card.footer}
                </div>

                <div className="text-muted-foreground text-xs">
                  {card.message}
                </div>
              </CardFooter>
            </Card>
          </AnimatedCard>
        );
      })}
    </div>
  );
}
