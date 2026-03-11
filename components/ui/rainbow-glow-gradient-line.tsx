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

interface Props {
  title?: string;
  description?: string;
  data?: { month: string; desktop: number }[];
  showYearSelector?: boolean;
  year?: string
  setYear?: (year: string) => void
}



const chartConfig = {
  desktop: {
    label: "Sales",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const fallbackData = [
  { month: "Jan", desktop: 120 },
  { month: "Feb", desktop: 250 },
  { month: "Mar", desktop: 180 },
  { month: "Apr", desktop: 310 },
  { month: "May", desktop: 220 },
  { month: "Jun", desktop: 270 },
];

/* Year list (for selector UI only) */
const years = Array.from({ length: 2030 - 2001 + 1 }, (_, i) =>
  (2001 + i).toString()
);

export function RainbowGlowGradientLineChart({
  title = "Sales Trends",
  description = "Monthly Sales",
  data = [],
  showYearSelector = true,
  year,
  setYear
}: Props) {

  const ITEMS_PER_PAGE = 15;
  const [page, setPage] = React.useState(0);

  const start = page * ITEMS_PER_PAGE;
  const visibleYears = years.slice(start, start + ITEMS_PER_PAGE);

   const chartData = data && data.length > 0 ? data : fallbackData;

  return (
    <Card className="shadow-lg">

      <CardHeader className="flex flex-row items-start justify-between">

        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description} {showYearSelector && year}
          </CardDescription>
        </div>

        {/* Year selector */}
        {showYearSelector && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[100px]">
                {year}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[220px]">

              <div className="grid grid-cols-3 gap-2">
                {visibleYears.map((y) => (
                  <Button
                    key={y}
                    variant={year === y ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setYear?.(y)}
                  >
                    {y}
                  </Button>
                ))}
              </div>

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

        <ChartContainer config={chartConfig}>

          <LineChart
            accessibilityLayer
          data={chartData}
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
                <stop offset="0%" stopColor="#0B84CE" />
                <stop offset="20%" stopColor="#224CD1" />
                <stop offset="40%" stopColor="#3A11C7" />
                <stop offset="60%" stopColor="#7107C6" />
                <stop offset="80%" stopColor="#C900BD" />
                <stop offset="100%" stopColor="#D80155" />
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