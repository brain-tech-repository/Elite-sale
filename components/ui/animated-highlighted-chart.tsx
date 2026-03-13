"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

interface Props {
  title?: string;
  description?: string;
  data?: { month: string; desktop: number }[];
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function AnimatedHighlightedAreaChart({
  title = "Sales Trends",
  description = "Last 12 Months",
  data = [],
}: Props) {
  const [selectedMonth, setSelectedMonth] = React.useState<string | null>(null);

  /* Filter chart data based on selected month */
  const filteredData = React.useMemo(() => {
    if (!selectedMonth) return data;

    const monthIndex = months.indexOf(selectedMonth);

    return data.slice(0, monthIndex + 1);
  }, [data, selectedMonth]);

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between">
        <CardTitle>{title}</CardTitle>

        {/* Month Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[110px]">
              {selectedMonth ? selectedMonth.slice(0, 3) : "Month"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[220px]">
            <div className="grid grid-cols-3 gap-2">
              {months.map((month) => (
                <Button
                  key={month}
                  variant={selectedMonth === month ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedMonth(month)}
                >
                  {month.slice(0, 3)}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* <CardDescription>{description}</CardDescription> */}
      </CardHeader>

      <CardContent className="h-[350px] w-full">
        {filteredData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No sales data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" tickLine={false} axisLine={false} />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value / 1000}k`}
              />

              <Tooltip formatter={(value: number) => [`${value}`, "Sales"]} />

              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <Legend />
              <Area
                type="monotone"
                dataKey="desktop"
                name="Sales"
                stroke="var(--chart-1)"
                fill="url(#salesGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
