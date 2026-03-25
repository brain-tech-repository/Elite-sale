import { z } from "zod";

/* ========================================================================== */
/*                               FILTER SCHEMA                                */
/* ========================================================================== */

export const salesFilterSchema = z.object({
  dateRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
  region: z.string().optional(),

  warehouse: z.string().optional(),

  sales_area: z.string().optional(),

  route: z.string().optional(),
});
export type SalesFilterFormValues = z.infer<typeof salesFilterSchema>;

/* ========================================================================== */
/*                               FILTER PAYLOAD                               */
/* ========================================================================== */

export type SalesFilterPayload = {
  [key: string]: string | number | Date | null | undefined;
  fromdate?: string;
  todate?: string;

  region_id?: string;
  warehouse_id?: string;
  sales_area_id?: string;
  route_id?: string;

  page?: number;
  length?: number;
};

/* ========================================================================== */
/*                            GENERIC API RESPONSE                            */
/* ========================================================================== */

export interface ApiResponse<T = any> {
  status: boolean;
  message?: string;
  data: T;
}

/* ========================================================================== */
/* ========================================================================== */

export interface SelectOption {
  value: string;
  label: string;
}

export type Sale = {
  sno: number;
  route: string;
  warehouse: string;
  salesman: string;

  totalCustomer: number;
  totalVisitDays: number;
  plannedVisit: number;
  unplannedVisit: number;

  dropRate: number; // ✅ ADD THIS
  avgTimeSpend: string; // ✅ ADD THIS
  totalInvoice: number; // ✅ ADD THIS
  avgInvoicePerDay: number; // ✅ ADD THIS

  salesValue: number; // ✅ ADD THIS
  salesPerDay: number; // ✅ ADD THIS

  totalCollection: number; // ✅ ADD THIS
  collectionPerDay: number; // ✅ ADD THIS
  pendingCollection: number; // ✅ ADD THIS
};

export type RouteSales = {
  route: string;

  weeklySales: number;
  last14DaysSales: number;
  monthSales: number;
  quarterSales: number;
  yearSales: number;
  todaySales: number;
  yesterdaySales: number;
  totalSales: number;
  totalCollection: number;
};

export type RouteExpense = {
  route: string;
  totalExpense: number;
};

export type RouteSalesCollection = {
  route: string;
  totalSales: number;
  totalCollection: number;
};
