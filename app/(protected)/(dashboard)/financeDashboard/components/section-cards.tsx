"use client"

import { motion, useAnimation } from "framer-motion"
import { useState } from "react"
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
  {
    title: "Completed Orders",
    value: "5,640",
    trend: 15,
    message: "Excellent performance",
    footer: "High completion rate",
    color: "bg-cyan-50",
  },
  {
    title: "Cart Abandonment",
    value: "23%",
    trend: -3,
    message: "Improving checkout",
    footer: "Lower abandonment",
    color: "bg-orange-50",
  },
  {
    title: "Website Visitors",
    value: "120K",
    trend: 18,
    message: "Traffic spike",
    footer: "Marketing success",
    color: "bg-sky-50",
  },
  {
    title: "Conversion Rate",
    value: "3.8%",
    trend: 1.2,
    message: "Optimized funnel",
    footer: "Better conversions",
    color: "bg-violet-50",
  },
]

function AnimatedCard({ children }: { children: React.ReactNode }) {
  const controls = useAnimation()
  const [hovered, setHovered] = useState(false)

  const handleHoverStart = async () => {
    setHovered(true)
    await controls.start({
      rotateY: 360,
      transition: { duration: 2, ease: "easeInOut" },
    })
    controls.set({ rotateY: 0 })
  }

  const handleHoverEnd = () => {
    setHovered(false)
    controls.stop()
    controls.set({ rotateY: 0 })
  }

  return (
    <motion.div
      style={{ perspective: 1000 }}
      animate={controls}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileHover={{ scale: 1.03 }}
      className="transition-shadow hover:shadow-lg"
    >
      {children}
    </motion.div>
  )
}

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cardsData.map((card, index) => {
        const isPositive = card.trend > 0
        const TrendIcon = isPositive ? IconTrendingUp : IconTrendingDown

        return (
          <AnimatedCard key={index}>
            <Card className={`p-3  shadow-lg ${card.color}`}>
              <CardHeader className="p-2 flex justify-between items-start">
                <div>
                  <CardDescription className="text-xs">
                    {card.title}
                  </CardDescription>

                  <CardTitle className="text-lg font-semibold tabular-nums">
                    {card.value}
                  </CardTitle>
                </div>

                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  <TrendIcon className="size-3 mr-1" />
                  {card.trend > 0 ? "+" : ""}
                  {card.trend}%
                </Badge>
              </CardHeader>

              <CardFooter className="flex-col items-start gap-1 text-xs p-2">
                <div className="flex gap-1 font-medium">
                  {card.footer}
                  <TrendIcon className="size-3" />
                </div>

                <div className="text-muted-foreground">
                  {card.message}
                </div>
              </CardFooter>
            </Card>
          </AnimatedCard>
        )
      })}
    </div>
  )
}