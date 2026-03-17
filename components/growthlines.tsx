import React from "react";
import { Card } from "./ui/card";

// ---------------- Types ----------------
export type GrowthItem = {
  label: string;
  value: number; // percentage 0-100
};

export interface GrowthLinesProps {
  items: GrowthItem[];
}

// Gradient styles (3 different bars)
const gradients = [
  "bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364]",
  "bg-gradient-to-r from-[#1E6C8E] to-[#2E7775]",
  "bg-gradient-to-r from-[#243748] to-[#4B749F]",
];

// ---------------- Component ----------------
const GrowthLines: React.FC<GrowthLinesProps> = ({ items }) => {
  return (
    <Card className="w-full shadow-md p-6 rounded-xl">
      <div className="w-full space-y-6">
        {items.slice(0, 3).map((item, index) => {
          const value = Math.max(0, Math.min(100, Number(item.value) || 0));
          const gradient = gradients[index % gradients.length];

          return (
            <div key={index} className="space-y-4">
              {/* Label + Value */}
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-bold">{value}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200/70 rounded-full h-5 overflow-hidden">
                <div
                  className={`h-5 rounded-full ${gradient} transition-all duration-700 ease-in-out`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default GrowthLines;
