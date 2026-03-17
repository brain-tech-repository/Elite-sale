"use client";

import React from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";

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

const chartData = [
  { name: "Page A", desktop: 18400, mobile: 12400, tablet: 8200 },
  { name: "Page B", desktop: 21000, mobile: 13980, tablet: 11000 },
  { name: "Page C", desktop: 15200, mobile: 19800, tablet: 14500 },
  //   { name: "Page D", desktop: 28000, mobile: 11000, tablet: 9000 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
  tablet: { label: "Tablet", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function AdvancedBarChart() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const formatYAxis = (value: number): string => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString(); // ✅ convert to string
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>High-Density Traffic Metrics</CardTitle>
        <CardDescription>Optimized spacing & responsive layout</CardDescription>
      </CardHeader>

      {/* Reduced horizontal padding */}
      <CardContent className="px-2">
        <ChartContainer config={chartConfig} className="w-full min-h-[350px]">
          <BarChart
            data={chartData}
            barGap={10} // space between bars in same group
            barCategoryGap="10%" // space between groups (fix shrink issue)
            margin={{ top: 20, right: 10, left: 10, bottom: 5 }} // reduced side spacing
            onMouseLeave={() => setActiveIndex(null)}
          >
            <defs>
              <linearGradient id="desktopGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0F2027" />
                <stop offset="50%" stopColor="#203A43" />
                <stop offset="100%" stopColor="#2C5364" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="name" tickLine={false} axisLine={false} />

            <YAxis
              tickLine={false}
              axisLine={false}
              width={20}
              tickFormatter={formatYAxis}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Legend verticalAlign="top" align="right" />

            {/* Desktop */}
            <Bar
              dataKey="desktop"
              fill="url(#desktopGradient)" // ✅ use gradient here
              radius={[10, 10, 0, 0]}
              maxBarSize={50} // responsive thickness
            >
              {chartData.map((_, i) => (
                <Cell
                  key={`desktop-${i}`}
                  fillOpacity={
                    activeIndex === null || activeIndex === i ? 1 : 0.3
                  }
                  onMouseEnter={() => setActiveIndex(i)}
                  className="transition-all duration-200"
                />
              ))}
            </Bar>

            {/* Mobile */}
            <Bar
              dataKey="mobile"
              fill="var(--color-mobile)"
              radius={[10, 10, 0, 0]}
              maxBarSize={50}
            >
              {chartData.map((_, i) => (
                <Cell
                  key={`mobile-${i}`}
                  fillOpacity={
                    activeIndex === null || activeIndex === i ? 1 : 0.3
                  }
                  onMouseEnter={() => setActiveIndex(i)}
                  className="transition-all duration-200"
                />
              ))}
            </Bar>

            {/* Tablet */}
            <Bar
              dataKey="tablet"
              fill="var(--color-tablet)"
              radius={[10, 10, 0, 0]}
              maxBarSize={50}
            >
              {chartData.map((_, i) => (
                <Cell
                  key={`tablet-${i}`}
                  fillOpacity={
                    activeIndex === null || activeIndex === i ? 1 : 0.3
                  }
                  onMouseEnter={() => setActiveIndex(i)}
                  className="transition-all duration-200"
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
