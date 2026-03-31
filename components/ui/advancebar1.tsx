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
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// ✅ Config
const chartConfig = {
  Target: { label: "Target", color: "var(--chart-1)" },
  Achievment: { label: "Achievment", color: "var(--chart-2)" },
};

// ✅ Fallback data (Jan to Dec, 2 times)
// const fallbackData = [
//   // Year 1
//   { name: "North Region", Target: 8200, Achievment: 7500 },
//   { name: "South Region", Target: 8600, Achievment: 7800 },
//   { name: "East Region", Target: 8900, Achievment: 8100 },
//   { name: "West Region", Target: 9400, Achievment: 8600 },
//   { name: "Central Region", Target: 9800, Achievment: 9000 },
//   { name: "North-East", Target: 10200, Achievment: 9400 },
//   { name: "North-West", Target: 10000, Achievment: 9200 },
//   { name: "South-East", Target: 10500, Achievment: 9700 },
//   { name: "South-West", Target: 11000, Achievment: 10200 },
//   { name: "Zone A", Target: 11500, Achievment: 10700 },
//   { name: "Zone B", Target: 12000, Achievment: 11200 },
//   { name: "Zone C", Target: 12500, Achievment: 11800 },
//   { name: "Zone D", Target: 12800, Achievment: 12100 },
//   { name: "Zone E", Target: 13200, Achievment: 12500 },
//   { name: "Zone F", Target: 13600, Achievment: 12900 },
//   { name: "Zone G", Target: 14000, Achievment: 13300 },
//   { name: "Zone H", Target: 14500, Achievment: 13800 },
//   { name: "Zone I", Target: 15000, Achievment: 14200 },
//   { name: "Zone J", Target: 14800, Achievment: 14000 },
//   { name: "Zone K", Target: 15200, Achievment: 14500 },
//   { name: "Zone L", Target: 15600, Achievment: 14900 },
//   { name: "Zone M", Target: 16000, Achievment: 15300 },
//   { name: "Zone N", Target: 16500, Achievment: 15800 },
//   { name: "Zone O", Target: 17000, Achievment: 16200 },
//   { name: "Zone P", Target: 17500, Achievment: 16700 },
//   { name: "Zone Q", Target: 18000, Achievment: 17200 },
//   { name: "Zone R", Target: 18500, Achievment: 17800 },
// ];

type ChartItem = {
  name: string;
  Target: number;
  Achievment: number;
};

const fallbackData = Array.from({ length: 27 }, (_, i) => ({
  name: `R${i + 1}`,
  Target: 8000 + i * 300,
  Achievment: 7000 + i * 280,
}));
export function AdvancedBarChart1({
  data,
  height = 250, // ✅ default height
  title = "Target Overview", // ✅ default title
}: {
  data?: ChartItem[];
  // data?: any[];
  height?: number;
  title?: string; // ✅ new prop
}) {
  const chartData: ChartItem[] = data && data.length > 0 ? data : fallbackData;

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [hiddenKeys, setHiddenKeys] = React.useState<string[]>([]);

  const formatYAxis = (value: number): string => {
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  const handleLegendClick = (dataKey: string) => {
    setHiddenKeys((prev) =>
      prev.includes(dataKey)
        ? prev.filter((key) => key !== dataKey)
        : [...prev, dataKey],
    );
  };

  return (
    <Card className="w-full py-3 shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="px-2">
        <ChartContainer
          config={chartConfig}
          className="w-full"
          style={{ height }} // ✅ controlled height
        >
          <BarChart
            data={chartData}
            barGap={2} // Slightly smaller gap since we have more bars
            barCategoryGap="8%" // Allows bars to scale properly
            margin={{ top: 20, right: 1, left: 1, bottom: 5 }}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {/* Gradient */}
            <defs>
              <linearGradient id="TargetGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0F2027" />
                <stop offset="50%" stopColor="#203A43" />
                <stop offset="100%" stopColor="#2C5364" />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#e5e7eb" vertical={false} />

            {/* X Axis */}
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd" // 🔥 Auto-hides overlapping labels on small screens
              tick={{ fontSize: 12 }}
              minTickGap={10}
            />

            {/* Y Axis */}
            <YAxis
              tickLine={false}
              axisLine={false}
              width={35}
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12 }}
            />

            {/* Tooltip */}
            <ChartTooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              content={<ChartTooltipContent />}
            />

            {/* Legend */}
            <Legend
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: "20px" }}
              onClick={(e: any) => handleLegendClick(e.dataKey)}
            />

            {/* Target */}
            <Bar
              dataKey="Target"
              fill="url(#TargetGradient)"
              radius={[4, 4, 0, 0]}
              maxBarSize={20} // 🔥 Switched back to maxBarSize so it fits 24 items
              hide={hiddenKeys.includes("Target")}
            >
              {chartData.map((_, i) => (
                <Cell
                  key={`Target-${i}`}
                  fillOpacity={
                    activeIndex === null || activeIndex === i ? 1 : 0.3
                  }
                  onMouseEnter={() => setActiveIndex(i)}
                  className="transition-opacity duration-300"
                />
              ))}
            </Bar>

            {/* Achievment */}
            <Bar
              dataKey="Achievment"
              fill="var(--chart-2)"
              radius={[4, 4, 0, 0]}
              maxBarSize={20} // 🔥 Switched back to maxBarSize so it fits 24 items
              hide={hiddenKeys.includes("Achievment")}
            >
              {chartData.map((_, i) => (
                <Cell
                  key={`Achievment-${i}`}
                  fillOpacity={
                    activeIndex === null || activeIndex === i ? 1 : 0.3
                  }
                  onMouseEnter={() => setActiveIndex(i)}
                  className="transition-opacity duration-300"
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
