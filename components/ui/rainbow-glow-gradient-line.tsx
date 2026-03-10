"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { ChevronRight, ChevronLeft } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

/* Generate years */
const years = Array.from({ length: 3000 - 2001 + 1 }, (_, i) =>
  (2001 + i).toString()
);

/* Sample data */
const yearlyData = {
  "2024": [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ],
  "2023": [
    { month: "January", desktop: 120 },
    { month: "February", desktop: 260 },
    { month: "March", desktop: 180 },
    { month: "April", desktop: 90 },
    { month: "May", desktop: 300 },
    { month: "June", desktop: 150 },
  ],
};

interface RainbowChartProps {
  title?: string;
  description?: string;
  year?: string;
  showYearSelector?: boolean;
}

export function RainbowGlowGradientLineChart({
  title = "Browser Distribution",
  description = "January - June",
  year: yearProp = "2024",
  showYearSelector = true,
}: RainbowChartProps) {

  const [year, setYear] = React.useState<string>(yearProp);

  const ITEMS_PER_PAGE = 15;
  const [page, setPage] = React.useState(0);

  const start = page * ITEMS_PER_PAGE;
  const visibleYears = years.slice(start, start + ITEMS_PER_PAGE);

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between">

        <div>
          <CardTitle className="flex items-center gap-2">
            {title}
          </CardTitle>

          <CardDescription>
            {description} {year}
          </CardDescription>
        </div>

        {/* Optional Year Selector */}
        {showYearSelector && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[100px]">
                {year}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[220px]">

              {/* Years Grid */}
              <div className="grid grid-cols-3 gap-2">
                {visibleYears.map((y) => (
                  <Button
                    key={y}
                    variant={year === y ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setYear(y)}
                  >
                    {y}
                  </Button>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-between mt-3">
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={page === 0}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  disabled={(page + 1) * ITEMS_PER_PAGE >= years.length}
                  onClick={() => setPage((p) => p + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

            </PopoverContent>
          </Popover>
        )}

      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} >
          <LineChart
            accessibilityLayer
            data={yearlyData[year as keyof typeof yearlyData]}
            margin={{ left: 12, right: 12 }}
          >

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Line
              dataKey="desktop"
              type="bump"
              stroke="url(#colorUv)"
              dot={false}
              strokeWidth={2}
              filter="url(#rainbow-line-glow)"
            />

            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0B84CE" stopOpacity={0.8} />
                <stop offset="20%" stopColor="#224CD1" stopOpacity={0.8} />
                <stop offset="40%" stopColor="#3A11C7" stopOpacity={0.8} />
                <stop offset="60%" stopColor="#7107C6" stopOpacity={0.8} />
                <stop offset="80%" stopColor="#C900BD" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#D80155" stopOpacity={0.8} />
              </linearGradient>

              <filter
                id="rainbow-line-glow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}