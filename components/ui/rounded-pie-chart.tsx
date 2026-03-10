"use client";

import * as React from "react";
import { LabelList, Pie, PieChart, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
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

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--chart-1)" },
  { browser: "safari", visitors: 200, fill: "var(--chart-2)" },
  { browser: "firefox", visitors: 187, fill: "var(--chart-3)" },
  { browser: "edge", visitors: 173, fill: "var(--chart-4)" },
  { browser: "other", visitors: 90, fill: "var(--chart-5)" },
];

const chartConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig;


interface RoundedPieChartProps {
  title?: string;
  description?: string;
}
export function RoundedPieChart({
  title = "Browser Distribution", // Default title
  description = "January - June 2024" // Default description
}: RoundedPieChartProps) {
  const [hidden, setHidden] = React.useState<string[]>([]);

  const toggleItem = (browser: string) => {
    setHidden((prev) =>
      prev.includes(browser)
        ? prev.filter((item) => item !== browser)
        : [...prev, browser]
    );
  };

  const updatedData = chartData.filter(
    (item) => !hidden.includes(item.browser)
  );

  return (
    <Card className="flex flex-col shadow-lg">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          {title}
        </CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="visitors" hideLabel />}
              />
              <Pie
                data={updatedData}
                innerRadius={30}
                outerRadius={80}
                dataKey="visitors"
                cornerRadius={8}
                paddingAngle={4}
                isAnimationActive
              >
                <LabelList
                  dataKey="visitors"
                  stroke="none"
                  fontSize={12}
                  fontWeight={500}
                  fill="#ffffff"
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {chartData.map((item) => {
            const isHidden = hidden.includes(item.browser);

            return (
              <button
                key={item.browser}
                onClick={() => toggleItem(item.browser)}
                className={`flex items-center gap-2 text-sm transition ${isHidden ? "opacity-40" : "opacity-100"
                  }`}
              >
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: item.fill }}
                />
                {chartConfig[item.browser as keyof typeof chartConfig]?.label}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}





