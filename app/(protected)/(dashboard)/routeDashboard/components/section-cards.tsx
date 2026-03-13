"use client";

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
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
    title: "Return Customers",
    value: "123",
    trend: -20,
    message: "Needs attention",
    footer: "Down 20%",
    color: "bg-purple-50",
  },
  {
    title: "Active Accounts",
    value: "4,567",
    trend: 1.5,
    message: "Exceeds target",
    footer: "Strong retention",
    color: "bg-green-50",
  },

  {
    title: "Refund Rate",
    value: "1.2%",
    trend: -2,
    message: "Improved quality",
    footer: "Lower refunds",
    color: "bg-rose-50",
  },
];

function AnimatedCard({ children }: { children: React.ReactNode }) {
  const controls = useAnimation();
  const [hovered, setHovered] = useState(false);

  const handleHoverStart = async () => {
    setHovered(true);
    await controls.start({
      rotateY: 360,
      transition: { duration: 0.7, ease: "easeInOut" },
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
    // className="transition-all duration-200 hover:shadow-xl rounded-lg"
    >
      {children}
    </motion.div>
  );
}

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cardsData.map((card, index) => {
        const isPositive = card.trend > 0;
        const TrendIcon = isPositive ? IconTrendingUp : IconTrendingDown;

        return (
          <AnimatedCard key={index}>
            <Card
              className={`p-4 shadow-sm hover:shadow-xl transition-all duration-300 rounded-xl border  shadow-sm ${card.color}`}
            >
              <CardHeader className="p-2 flex justify-between items-start">
                <div className="space-y-1">
                  <CardDescription className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardDescription>

                  <CardTitle className="text-2xl font-bold tabular-nums tracking-tight">
                    {card.value}
                  </CardTitle>
                </div>

                <Badge
                  variant="outline"
                  className={`text-xs px-2 py-1 flex items-center gap-1 ${
                    isPositive
                      ? "text-green-600 border-green-200"
                      : "text-red-600 border-red-200"
                  }`}
                >
                  <TrendIcon className="size-3" />
                  {card.trend > 0 ? "+" : ""}
                  {card.trend}%
                </Badge>
              </CardHeader>

              <CardFooter className="flex-col items-start gap-1 text-xs p-1 mt-1">
                <div
                  className={`flex items-center gap-1 font-medium ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {card.footer}
                  <TrendIcon className="size-3" />
                </div>

                <div className="text-muted-foreground">{card.message}</div>
              </CardFooter>
            </Card>
          </AnimatedCard>
        );
      })}
    </div>
  );
}
