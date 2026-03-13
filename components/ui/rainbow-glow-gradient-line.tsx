"use client";

import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { ChevronRight, ChevronLeft } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  showYearSelector?: boolean;
  year?: string;
  setYear?: (year: string) => void;
}

const fallbackData = [
  { month: "01", desktop: 120 },
  { month: "02", desktop: 250 },
  { month: "03", desktop: 180 },
  { month: "04", desktop: 310 },
  { month: "05", desktop: 220 },
  { month: "06", desktop: 270 },
];

const years = Array.from({ length: 2030 - 2001 + 1 }, (_, i) =>
  (2001 + i).toString(),
);

export function RainbowGlowGradientLineChart({
  title = "Sales Trends",
  description = "Monthly Sales",
  data = [],
  showYearSelector = true,
  year,
  setYear,
}: Props) {
  const ITEMS_PER_PAGE = 15;
  const [page, setPage] = React.useState(0);

  const start = page * ITEMS_PER_PAGE;
  const visibleYears = years.slice(start, start + ITEMS_PER_PAGE);

  const chartData = data && data.length > 0 ? data : fallbackData;

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between">
        <CardTitle>{title}</CardTitle>
        {/* <CardDescription>
            {description} {showYearSelector && year}
          </CardDescription> */}

        {showYearSelector && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[100px]">
                {year}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[220px]">
              <div className="grid grid-cols-3 gap-2">
                {visibleYears.map((y) => (
                  <Button
                    key={y}
                    variant={year === y ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setYear?.(y)}
                  >
                    {y}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between mt-3">
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={page === 0}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  disabled={(page + 1) * ITEMS_PER_PAGE >= years.length}
                  onClick={() => setPage((p) => p + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </CardHeader>

      <CardContent className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" tickLine={false} axisLine={false} />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />

            <Tooltip formatter={(value: number) => [`${value}`, "Sales"]} />

            <Legend />

            <Line
              type="monotone"
              dataKey="desktop"
              name="Sales"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
