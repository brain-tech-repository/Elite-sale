"use client";

import { Pie, PieChart } from "recharts";
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
  { name: "Low", value: 33, fill: "#FECACA" },
  { name: "Medium", value: 33, fill: "#FDE68A" },
  { name: "High", value: 34, fill: "#C7F9CC" },
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
  const cy = 160;
  const innerRadius = 60;
  const outerRadius = 100;

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Performance Gauge
        </CardTitle>

        <div className="flex items-center space-x-2">
          <span>DTM</span>
          <Switch id="airplane-mode" />
          <span>MTY</span>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart width={300} height={200}>
            <Pie
              data={chartData}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              cx={cx}
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
            />

            {renderNeedle(score, chartData, cx, cy, innerRadius, outerRadius)}

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-2 text-sm">
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
