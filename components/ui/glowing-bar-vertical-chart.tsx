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
import { Legend, ResponsiveContainer } from "recharts";

export const description = "A bar chart";

/* ---------------- CUSTOM LEGEND RENDERER ---------------- */
/* ---------------- CUSTOM LEGEND ---------------- */

const renderCustomLegend = (props: any) => {
  const { payload } = props;

  return (
    <ul className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-x-4 gap-y-2 mb-6 pl-6 sm:pl-10">
      {payload.map((entry: any, index: number) => (
        <li
          key={`item-${index}`}
          className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground"
        >
          <div
            className="h-2 w-2 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="truncate">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

/* ---------------- REGION COLOR PALETTE ---------------- */

const regionColors = [
  "#5887eb", // blue
  "#2ebe8e", // emerald
  "#7476f1", // indigo
  "#24b9a8", // teal
  "#617591", // slate
  "#2d99b4", // cyan
  "#6059eb", // violet
  "#059669", // green
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

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ... existing imports and renderCustomLegend ... */

  // export function GlowingBarVerticalChart({ data = [], regions = [] }: Props) {
  // ... existing state and useEffect ...

  return (
    <Card>
      <CardHeader>{/* ... existing Header content ... */}</CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          /* Increased height on mobile (h-[450px]) to fit legend + graph */
          className="w-full h-[500px] sm:h-[350px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              accessibilityLayer
              data={data}
              layout="vertical"
              /* Added top: 40 to give the legend room. 
                 Changed left: 10 so the Y-Axis labels aren't cut off.
              */
              margin={{ left: 10, right: 10, top: 40, bottom: 10 }}
            >
              <YAxis
                type="category"
                dataKey="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value: string) => value.slice(0, 3)}
              />

              <XAxis type="number" hide />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Legend
                verticalAlign="top"
                align="center"
                content={renderCustomLegend}
              />

              {/* DYNAMIC REGION BARS */}
              {regions.map((region, index) => (
                <Bar
                  key={region}
                  stackId="a"
                  barSize={12}
                  dataKey={region}
                  fill={regionColors[index % regionColors.length]}
                  radius={4}
                  shape={(props: any) => (
                    <CustomGradientBar
                      {...props}
                      activeProperty={activeProperty}
                    />
                  )}
                  overflow="visible"
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
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
  },
) => {
  const { fill, x, y, width, height, dataKey, activeProperty, radius } = props;

  const isActive = activeProperty === "all" || activeProperty === dataKey;

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
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </>
  );
};
