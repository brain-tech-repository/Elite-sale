"use client";

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const cardsData = [
  {
    title: "Active Accounts",
    value: "45,678",
    message: "Exceeds target",
    color: "bg-green-50",
  },
  {
    title: "Growth Rate",
    value: "4.5%",
    message: "Meets projection",
    color: "bg-indigo-50",
  },
  {
    title: "Orders Sales",
    value: "2,890",
    message: "This quarter",
    color: "bg-amber-50",
  },
  {
    title: "Refund Rate",
    value: "1.2%",
    message: "Improved quality",
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
      transition: { duration: 0.8, ease: "easeInOut" },
    });

    controls.set({ rotateY: 0 });
  };

  const handleHoverEnd = () => {
    setHovered(false);
    controls.stop();
    controls.set({ rotateY: 0 });
  };

  return <motion.div>{children}</motion.div>;
}

export function SectionCards() {
  return (
    <Card className="grid grid-cols-1 gap-3 shadow-xm px-5">
      {cardsData.map((card, index) => (
        <AnimatedCard key={index}>
          <Card className={`py-1 px-3 shadow-xm ${card.color}`}>
            <CardHeader className="px-1 space-y-1">
              <CardDescription className="text-[15px]">
                {card.title}
              </CardDescription>

              <CardTitle className="text-base font-semibold tabular-nums">
                {card.value}
              </CardTitle>
            </CardHeader>
          </Card>
        </AnimatedCard>
      ))}
    </Card>
  );
}
