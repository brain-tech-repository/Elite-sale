"use client";

import { Pie, PieChart, ResponsiveContainer, Customized } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { Switch } from "./switch";
import { Label } from "./label";

/* ---------------- DATA ---------------- */

const score = 80;

const chartData = [
  { name: "Low", value: 33, fill: "#38c1eb" },
  { name: "Medium", value: 33, fill: "#478edf" },
  { name: "High", value: 34, fill: "#5b73b4" },
];

/* ---------------- CONFIG ---------------- */

const chartConfig = {
  value: {
    label: "Performance",
    color: "#93C5FD",
  },
} satisfies ChartConfig;

/* ---------------- NEEDLE ---------------- */

const NEEDLE_COLOR = "#64748B";

const renderNeedle = (
  value: number,
  data: any[],
  innerRadius: number,
  outerRadius: number,
) => {
  return (
    <Customized
      component={({ width, height }: any) => {
        // dynamically calculate the center using the chart's current dimensions
        // to match the Pie's cx="50%" and cy="80%"
        const cx = (width || 0) / 2;
        const cy = (height || 0) * 0.8;

        const total = data.reduce((acc: any, cur: any) => acc + cur.value, 0);
        const angle = 180 * (value / total);
        const needleLength = innerRadius + (outerRadius - innerRadius) * 0.9;

        const rad = Math.PI / 180;
        const x = cx + needleLength * Math.cos(Math.PI - angle * rad);
        const y = cy - needleLength * Math.sin(Math.PI - angle * rad);

        return (
          <g>
            <circle cx={cx} cy={cy} r={5} fill={NEEDLE_COLOR} />
            <line
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke={NEEDLE_COLOR}
              strokeWidth={3}
            />
          </g>
        );
      }}
    />
  );
};

/* ---------------- COMPONENT ---------------- */

export function GaugePieChartCard() {
  // Using consistent radiuses for both the Pie and Needle
  const innerRadius = 60;
  const outerRadius = 100;

  return (
    <Card className="shadow-xm h-full flex flex-col py-3">
      <CardHeader className="gap-1">
        <div className="flex items-center justify-between text-sm">
          <CardTitle>Performance Gauge</CardTitle>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <span>DTM</span>
          <Switch id="airplane-mode" />
          <span>MTY</span>
        </div>
      </CardHeader>

      {/* 👇 Make content grow */}
      <CardContent className="lg:h-[110px]">
        <ChartContainer config={chartConfig} className="p-0 m-0">
          <div className="w-full h-full min-h-[130px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart className="p-0 m-0">
                <Pie
                  data={chartData}
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  cx="50%"
                  cy="80%"
                  innerRadius={innerRadius}
                  outerRadius={outerRadius}
                />

                {renderNeedle(score, chartData, innerRadius, outerRadius)}

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>

      {/* 👇 Footer stays at bottom */}
      <CardFooter className="flex flex-col items-start text-sm">
        <div className="font-medium">
          Score: <span className="text-emerald-600">{score}%</span>
        </div>

        <div className="text-muted-foreground">
          Target: 75% • Status: Above target
        </div>
      </CardFooter>
    </Card>
  );
}
