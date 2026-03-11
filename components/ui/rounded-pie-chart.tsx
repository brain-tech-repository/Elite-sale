"use client";

import * as React from "react";
import { LabelList, Pie, PieChart, ResponsiveContainer } from "recharts";

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

interface PieItem {
  label: string;
  y: number;
}

interface RoundedPieChartProps {
  title?: string;
  description?: string;
  data?: PieItem[];
}

export function RoundedPieChart({
  title = "Sales Contribution",
  description = "Distribution",
  data = [],
}: RoundedPieChartProps) {

  const colors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  /* -------------------------------------------------------------------------- */
  /*                          FORMAT API DATA FOR CHART                         */
  /* -------------------------------------------------------------------------- */

  const chartData = React.useMemo(() => {
    return data.map((item, index) => ({
      name: item.label,
      value: item.y,
      fill: colors[index % colors.length],
    }));
  }, [data]);

  const chartConfig = {
    value: { label: "Sales" },
  } satisfies ChartConfig;

  const [hidden, setHidden] = React.useState<string[]>([]);

  const toggleItem = (name: string) => {
    setHidden((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const updatedData = chartData.filter(
    (item) => !hidden.includes(item.name)
  );

  return (
    <Card className="flex flex-col shadow-lg">

      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">

        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full h-[250px]"
        >

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <ChartTooltip
                content={<ChartTooltipContent nameKey="value" hideLabel />}
              />

              <Pie
                data={updatedData}
                innerRadius={30}
                outerRadius={80}
                dataKey="value"
                cornerRadius={8}
                paddingAngle={4}
              >

                {/* <LabelList
                  dataKey="value"
                  stroke="none"
                  fontSize={12}
                  fontWeight={500}
                  fill="#ffffff"
                /> */}

              </Pie>

            </PieChart>
          </ResponsiveContainer>

        </ChartContainer>

        {/* Legend */}

        <div className="flex flex-wrap justify-center gap-3 pt-2">

          {chartData.map((item) => {

            const isHidden = hidden.includes(item.name);

            return (
              <button
                key={item.name}
                onClick={() => toggleItem(item.name)}
                className={`flex items-center gap-2 text-sm transition ${
                  isHidden ? "opacity-40" : "opacity-100"
                }`}
              >

                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: item.fill }}
                />

                {item.name}

              </button>
            );
          })}

        </div>

      </CardContent>

    </Card>
  );
}