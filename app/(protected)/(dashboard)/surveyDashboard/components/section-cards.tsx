"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const cardsData = [
  {
    id: "surveys",
    title: "Total Surveys",
    value: "3",
    message: "Surveys collected",
    footer: "Active surveys",
    color: "bg-blue-50",
  },
  {
    id: "country",
    title: "IB Country",
    value: "3",
    message: "Countries available",
    footer: "Coverage growing",
    color: "bg-purple-50",
  },
  {
    id: "users",
    title: "IB Users",
    value: "6",
    message: "Active users",
    footer: "User growth",
    color: "bg-green-50",
  },
  {
    id: "customers",
    title: "IB Customers",
    value: "26",
    message: "Customer engagement",
    footer: "Customers increased",
    color: "bg-rose-50",
  },
]

export function SectionCards({ onCardClick }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cardsData.map((card) => (
        <Card
          key={card.id}
          onClick={() => onCardClick(card.id)}
          className={`p-4 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 rounded-xl border shadow-lg ${card.color}`}
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
          </CardHeader>

          <CardFooter className="flex-col items-start gap-1 text-xs p-1 mt-1">
            <div className="text-muted-foreground">{card.message}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}