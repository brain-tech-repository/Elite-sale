"use client";

import { Pie, PieChart, ResponsiveContainer } from "recharts";
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
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
) => {
  const total = data.reduce((acc, cur) => acc + cur.value, 0);

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
};

/* ---------------- COMPONENT ---------------- */

export function GaugePieChartCard() {
  const cx = 150;
  const cy = 130; // Reduced from 160 to pull the chart up
  const innerRadius = 70;
  const outerRadius = 100;

  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className=" gap-2">
        <div className="flex items-center justify-between text-sm">
          <CardTitle>Performance Gauge</CardTitle>
        </div>

        <div className="flex items-center space-x-4 text-xs ">
          <span>DTM</span>
          <Switch id="airplane-mode" />
          <span>MTY</span>
        </div>
      </CardHeader>

      {/* 👇 Make content grow */}
      <CardContent className="flex-1 pt-0 mt-0">
        <ChartContainer config={chartConfig}>
          <div className="w-full h-full min-h-[130px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  cx="50%"
                  cy="80%"
                  innerRadius={60}
                  outerRadius={100}
                />

                {renderNeedle(score, chartData, 110, 100, 70, 110)}

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
