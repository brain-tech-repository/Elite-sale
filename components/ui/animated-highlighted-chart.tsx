"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import React from "react";

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
}

const animationConfig = {
  glowWidth: 300,
};

const months = [
  "January","February","March",
  "April","May","June",
  "July","August","September",
  "October","November","December"
];

const chartConfig = {
  desktop: {
    label: "Sales",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function AnimatedHighlightedAreaChart({
  title = "Sales Trends",
  description = "Last 12 Months",
  data = [],
}: Props) {

  const [xAxis, setXAxis] = React.useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = React.useState<string | null>(null);

  /* Filter chart data based on selected month */
  const filteredData = React.useMemo(() => {

    if (!selectedMonth) return data;

    const monthIndex = months.indexOf(selectedMonth);

    return data.slice(0, monthIndex + 1);

  }, [data, selectedMonth]);

  return (
    <Card className="shadow-lg">

      <CardHeader>

        <div className="flex items-center justify-between">

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

        </div>

        <CardDescription>{description}</CardDescription>

      </CardHeader>

      <CardContent>

        <ChartContainer config={chartConfig}>

          <AreaChart
            accessibilityLayer
            data={filteredData}
            onMouseMove={(e) => setXAxis(e.chartX as number)}
            onMouseLeave={() => setXAxis(null)}
          >

            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <defs>

              <linearGradient
                id="animated-highlighted-mask-grad"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="white" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              <linearGradient
                id="animated-highlighted-grad-desktop"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0}
                />
              </linearGradient>

              {xAxis && (
                <mask id="animated-highlighted-mask">
                  <rect
                    x={xAxis - animationConfig.glowWidth / 2}
                    y={0}
                    width={animationConfig.glowWidth}
                    height="100%"
                    fill="url(#animated-highlighted-mask-grad)"
                  />
                </mask>
              )}

            </defs>

            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#animated-highlighted-grad-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              strokeWidth={2}
              mask="url(#animated-highlighted-mask)"
            />

          </AreaChart>

        </ChartContainer>

      </CardContent>

    </Card>
  );
}