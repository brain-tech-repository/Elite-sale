"use client"

import { motion, useAnimation } from "framer-motion"
import { useState } from "react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const cardsData = [
  {
    title: "Today",
    value: "0",
    color: "bg-blue-50",
  },
  {
    title: "This Month",
    value: "9",
    color: "bg-green-50",
  },
  {
    title: "Total Customer",
    value: "8,559",
    color: "bg-indigo-50",
  },
  {
    title: "Pending Approval",
    value: "145",
    color: "bg-amber-50",
  },
]
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

export function SectionCards() {
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