"use client";

import { TrendingDown } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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

import { Badge } from "@/components/ui/badge";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Legend } from "recharts";

export const description = "A bar chart";

/* ---------------- REGION COLOR PALETTE ---------------- */

const regionColors = [
  "#3b82f6",
  "#ef4444",
  "#22c55e",
  "#f59e0b",
  "#a855f7",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
  "#f97316",
  "#6366f1",
];

/* ---------------- CHART CONFIG ---------------- */

const chartConfig = {
  value: {
    label: "Customers",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type ActiveProperty = string | "all";

/* ---------------- PROPS ---------------- */

interface Props {
  data?: any[];
  regions?: string[];
}

/* ---------------- COMPONENT ---------------- */

export function GlowingBarVerticalChart({ data = [], regions = [] }: Props) {
  const [activeProperty, setActiveProperty] =
    React.useState<ActiveProperty>("all");

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle>
            Vertical Bar Chart
            <Badge
              variant="outline"
              className="text-red-500 bg-red-500/10 border-none ml-2"
            >
              <TrendingDown className="h-4 w-4" />
              <span>-5.2%</span>
            </Badge>
          </CardTitle>

          {/* REGION FILTER */}
          <Select
            value={activeProperty}
            onValueChange={(value: ActiveProperty) =>
              setActiveProperty(value)
            }
          >
            <SelectTrigger className="text-xs !h-6 !px-1.5">
              <SelectValue placeholder="Select a property" />
            </SelectTrigger>

            <SelectContent align="end">
              <SelectGroup>
                <SelectLabel>Properties</SelectLabel>

                <SelectItem className="text-xs" value="all">
                  All
                </SelectItem>

                {regions.map((region) => (
                  <SelectItem
                    key={region}
                    className="text-xs"
                    value={region}
                  >
                    {region}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ left: -15 }}
          >
            <YAxis
              type="category"
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />

            <XAxis
              type="number"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

               <Legend verticalAlign="top" height={36} />

            {/* DYNAMIC REGION BARS */}
      {regions.map((region, index) => (
  <Bar
    key={region}
    stackId="a"
    barSize={8}
    dataKey={region}
    fill={regionColors[index % regionColors.length]}
    radius={4}
    shape={(props:any) => (
      <CustomGradientBar {...props} activeProperty={activeProperty} />
    )}
    overflow="visible"
  />
))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

/* ---------------- CUSTOM BAR SHAPE ---------------- */

const CustomGradientBar = (
  props: React.SVGProps<SVGRectElement> & {
    dataKey?: string;
    activeProperty?: string | "all";
  }
) => {
  const { fill, x, y, width, height, dataKey, activeProperty, radius } =
    props;

  const isActive =
    activeProperty === "all" || activeProperty === dataKey;

  return (
    <>
      <rect
        x={x}
        y={y}
        rx={radius}
        width={width}
        height={height}
        stroke="none"
        fill={fill}
        opacity={isActive ? 1 : 0.15}
        filter={
          isActive && activeProperty !== "all"
            ? `url(#glow-chart-${dataKey})`
            : undefined
        }
      />

      <defs>
        <filter
          id={`glow-chart-${dataKey}`}
          x="-200%"
          y="-200%"
          width="600%"
          height="600%"
        >
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feComposite
            in="SourceGraphic"
            in2="blur"
            operator="over"
          />
        </filter>
      </defs>
    </>
  );
};