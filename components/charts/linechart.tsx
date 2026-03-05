"use client";

import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

const data = [
  { name: "Page A", uv: 180, pv: 170 }, // high start
  { name: "Page B", uv: 60, pv: 70 },   // drop
  { name: "Page C", uv: 160, pv: 150 }, // rise
  { name: "Page D", uv: 110, pv: 100 }, // slight drop
  { name: "Page E", uv: 190, pv: 180 }, // rise again
  { name: "Page F", uv: 40, pv: 130 }, // small fall
  { name: "Page G", uv: 170, pv: 20 }, // slight rise
];
export default function Example() {
  return (
    <Card className="flex flex-col shadow-lg">
      <CardHeader>
        <CardTitle>
          Traffic Analytics
          <Badge
            variant="outline"
            className="text-green-500 bg-green-500/10 border-none ml-2"
          >
            <TrendingUp className="h-4 w-4" />
            <span>+12.4%</span>
          </Badge>
        </CardTitle>
        <CardDescription>January - July 2024</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="w-full h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="pv"
                stroke="url(#rainbowGradient)"
                strokeWidth={3}
                dot={false}
                filter="url(#lineGlow)"
              />

              <defs>
                <linearGradient id="rainbowGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={0.95} />
                  <stop offset="20%" stopColor="#06B6D4" stopOpacity={0.95} />
                  <stop offset="40%" stopColor="#22C55E" stopOpacity={0.95} />
                  <stop offset="60%" stopColor="#A855F7" stopOpacity={0.95} />
                  <stop offset="80%" stopColor="#EC4899" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#F43F5E" stopOpacity={0.95} />
                </linearGradient>

                <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}