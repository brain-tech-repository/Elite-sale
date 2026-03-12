"use client"

import { motion, useAnimation } from "framer-motion"
import { useState } from "react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SalesFilterPayload } from "../types"
import { useDashboardSummary } from "../useCustomers"


function AnimatedCard({ children }: { children: React.ReactNode }) {
  const controls = useAnimation()
  const [hovered, setHovered] = useState(false)

  const handleHoverStart = async () => {
    setHovered(true)

    await controls.start({
      rotateY: 360,
      transition: { duration: 0.8, ease: "easeInOut" },
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
    >
      {children}
    </motion.div>
  )
}

type Props = {
  filters: SalesFilterPayload | null
}

export function SectionCards({ filters }: Props) {

  const { data, isLoading } = useDashboardSummary(filters)

  const result = data?.data || {}
  const cardsData = [
    {
      title: "Today",
      value: result.today ?? 0,
      color: "bg-blue-50",
    },
    {
      title: "This Month",
      value: result.this_month ?? 0,
      color: "bg-green-50",
    },
    {
      title: "Total Customer",
      value: result.total_customer ?? 0,
      color: "bg-indigo-50",
    },
    {
      title: "Pending Approval",
      value: result.pending_approval ?? 0,
      color: "bg-amber-50",
    },
  ]
  return (
    <Card className="grid grid-cols-1 gap-3 shadow-lg px-5">
       {cardsData.map((card, index) => (
        <AnimatedCard key={index}>
          <Card className={`py-1 px-3 shadow-md ${card.color}`}>
            <CardHeader className="">
             <CardDescription className="text-sm font-semibold text-muted-foreground">
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
  )
}