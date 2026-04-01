"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function ChartSkeleton() {
  return (
    <Card className="p-4 space-y-4">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-[260px] w-full rounded-xl" />
    </Card>
  );
}

export function TableSkeleton() {
  return (
    <Card className="p-4 space-y-3">
      <Skeleton className="h-6 w-40" />
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} className="h-10 w-full rounded-md" />
      ))}
    </Card>
  );
}

export function CardsSkeleton() {
  return (
    <Card className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-4 space-y-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-8 w-24" />
        </Card>
      ))}
    </Card>
  );
}
