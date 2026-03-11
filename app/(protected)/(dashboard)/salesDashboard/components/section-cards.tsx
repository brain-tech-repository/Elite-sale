"use client"
import { motion } from "framer-motion"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useDashboardSummary } from "../useSales"

function AnimatedCard({ children }: { children: React.ReactNode }) {
  return <motion.div>{children}</motion.div>
}
export function SectionCards() {

  const { data, isLoading } = useDashboardSummary()

  const result = data?.Result

  const cardsData = [
    {
      title: "Today Sales",
      value: result?.today_sales ?? 0,

      color: "bg-blue-50",
    },
    {
      title: "Total Sales",
      value: result?.total_sales ?? 0,

      color: "bg-purple-50",
    },
    {
      title: "Today Collection",
      value: result?.today_collection ?? 0,

      color: "bg-green-50",
    },
    {
      title: "Total Collection",
      value: result?.total_collection ?? 0,

      color: "bg-indigo-50",
    },
    {
      title: "Today Return",
      value: result?.today_return ?? 0,

      color: "bg-amber-50",
    },
    {
      title: "Total Return",
      value: result?.total_return ?? 0,

      color: "bg-rose-50",
    },
  ]

  if (isLoading) {
    return <div className="p-4">Loading summary...</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cardsData.map((card, index) => (
        <AnimatedCard key={index}>
          <Card className={`p-4 rounded-xl shadow-md ${card.color}`}>
            <CardHeader className="p-2">
              <CardDescription className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {card.title}
              </CardDescription>
              <CardTitle className="text-2xl font-bold">
                {card.value}
              </CardTitle>
            </CardHeader>
          </Card>
        </AnimatedCard>
      ))}
    </div>
  )
}