import api from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

import { ApiResponse, SelectOption, SalesFilterPayload } from "./types";

/* ========================================================================== */
/*                              HELPER FUNCTION                               */
/* ========================================================================== */

const mapOptions = (data: ApiResponse<any[]>): SelectOption[] => {
  if (!data?.data) return [];
  return data.data.map((item: any) => ({
    value: String(item.id),
    label:
      item.region_name ??
      item.sub_region_name ??
      item.warehouse_name ??
      item.route_name ??
      "Unknown",
  }));
};

/* ========================================================================== */
/*                               MASTER FETCHER                               */
/* ========================================================================== */

const fetchMaster = async (
  endpoint: string,
  params: Record<string, string> = {},
) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value),
  );

  const query = new URLSearchParams(filteredParams).toString();
  const url = query ? `${endpoint}?${query}` : endpoint;
  const { data } = await api.get(url);
  return data;
};

/* ========================================================================== */
/*                           FILTER DROPDOWN HOOKS                            */
/* ========================================================================== */

/* REGIONS */

export const useRegions = () =>
  useQuery<SelectOption[]>({
    queryKey: ["regions"],

    queryFn: async () => {
      const data = await fetchMaster("/route-analysis-dropdowns/regions");

      return mapOptions(data);
    },

    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

/* WAREHOUSES */

export const useSubregion = (regionId?: string) =>
  useQuery<SelectOption[]>({
    queryKey: ["sub-region", regionId],

    queryFn: async () => {
      const data = await fetchMaster("/route-analysis-dropdowns/sub-regions", {
        region_id: regionId || "",
      });

      return mapOptions(data);
    },

    enabled: !!regionId,
    refetchOnWindowFocus: false,
  });

/* SALES AREAS */

export const useWarehouses = (warehouseId?: string) =>
  useQuery<SelectOption[]>({
    queryKey: ["warehouse", warehouseId],

    queryFn: async () => {
      const data = await fetchMaster("/route-analysis-dropdowns/warehouses", {
        warehouse_id: warehouseId || "",
      });

      return mapOptions(data);
    },

    enabled: !!warehouseId,
    refetchOnWindowFocus: false,
  });

/* ROUTES */

export const useRoutes = (salesAreaId?: string) =>
  useQuery<SelectOption[]>({
    queryKey: ["routes", salesAreaId],

    queryFn: async () => {
      const data = await fetchMaster("/route-analysis-dropdowns/routes", {
        sales_area_id: salesAreaId || "",
      });

      return mapOptions(data);
    },

    enabled: !!salesAreaId,
    refetchOnWindowFocus: false,
  });

/* ========================================================================== */
/*                             DASHBOARD SUMMARY                              */
/* ========================================================================== */

export const useDashboardSummary = (filters?: SalesFilterPayload) =>
  useQuery({
    queryKey: ["customer-summary", filters],

    queryFn: async () => {
      const query = new URLSearchParams(
        (filters ?? {}) as Record<string, string>,
      ).toString();

      const { data } = await api.get(`/route-analysis/summary?${query}`);

      return data;
    },

    refetchOnWindowFocus: false,
  });

export const useGrowthPerformance = (filters?: SalesFilterPayload) =>
  useQuery({
    queryKey: ["region-performance", filters],

    queryFn: async () => {
      const query = new URLSearchParams(
        Object.entries(filters ?? {}).reduce(
          (acc, [key, value]) => {
            if (value !== undefined && value !== null) {
              if (value instanceof Date) {
                acc[key] = value.toISOString();
              } else {
                acc[key] = String(value);
              }
            }
            return acc;
          },
          {} as Record<string, string>,
        ),
      ).toString();
      const { data } = await api.get(
        `/route-analysis/route-completion?${query}`,
      );

      return data?.data || null; // ✅ return raw
    },

    refetchOnWindowFocus: false,
  });

export const useMonthlyTrend = (filters?: SalesFilterPayload) =>
  useQuery({
    queryKey: ["route-monthly-trend", filters],

    queryFn: async () => {
      const query = new URLSearchParams(
        (filters ?? {}) as Record<string, string>,
      ).toString();

      const { data } = await api.get(`/route-analysis/monthly-trend?${query}`);

      const completion = data?.data?.completion || [];
      const success = data?.data?.success || [];
      const incompletion = data?.data?.incompletion || [];

      const merged = completion.map((item: any, index: number) => ({
        name: item.label,

        // ✅ match chart keys
        completion: item.y || 0,
        success: success[index]?.y || 0,
        incompletion: incompletion[index]?.y || 0,
      }));

      return merged;
    },

    refetchOnWindowFocus: false,
  });

export const useMonthlyCompareDropSizeRevenue = (
  filters?: SalesFilterPayload,
) =>
  useQuery({
    queryKey: ["customer-monthly-trend", filters],

    queryFn: async () => {
      const query = new URLSearchParams(
        (filters ?? {}) as Record<string, string>,
      ).toString();
      const { data } = await api.get(
        `/route-analysis/drop-size-revenue?${query}`,
      );

      return (
        data?.data?.map((item: any) => ({
          month: item.label,
          desktop: item.y,
        })) || []
      );
    },

    refetchOnWindowFocus: false,
  });

export const useMonthlyCompareDropSizeVolume = (filters?: SalesFilterPayload) =>
  useQuery({
    queryKey: ["customer-monthly-trend", filters],

    queryFn: async () => {
      const query = new URLSearchParams(
        (filters ?? {}) as Record<string, string>,
      ).toString();
      const { data } = await api.get(
        `/route-analysis/drop-size-volume?${query}`,
      );

      return (
        data?.data?.map((item: any) => ({
          month: item.label,
          desktop: item.y,
        })) || []
      );
    },

    refetchOnWindowFocus: false,
  });

export const useRoutePerformance = (filters?: SalesFilterPayload) =>
  useQuery({
    queryKey: ["route-performance", filters],
    queryFn: async () => {
      const query = new URLSearchParams((filters ?? {}) as any).toString();

      const { data } = await api.get(`/route-analysis/performance?${query}`);

      return (
        data?.data?.table_data?.map((item: any) => ({
          route: item.name,
          totalSales: item.total_sales ?? 0,
          totalCollection: item.total_collection ?? 0,
        })) || []
      );
    },
  });

export const useRoutePerformanceGraph = () =>
  useQuery({
    queryKey: ["route-performance-graph"], // 🔥 no filters

    queryFn: async () => {
      const { data } = await api.get(`/route-analysis/performance`);

      return data?.data || {};
    },

    staleTime: Infinity, // 🔥 only first time load
  });

export const useRouteExpense = (filters?: SalesFilterPayload) =>
  useQuery({
    queryKey: ["route-expense", filters],
    queryFn: async () => {
      const query = new URLSearchParams((filters ?? {}) as any).toString();

      const { data } = await api.get(
        `/route-analysis/expense-analysis?${query}`,
      );

      return (
        data?.data?.table_data?.map((item: any) => ({
          route: item.route_name,
          totalExpense: item.total_expense ?? 0,
        })) || []
      );
    },
  });

export const useRouteExpenseGraph = () =>
  useQuery({
    queryKey: ["route-expense-graph"], // 🔥 no filters

    queryFn: async () => {
      const { data } = await api.get(`/route-analysis/expense-analysis`);

      return data?.data || {};
    },

    staleTime: Infinity,
  });

export const useRouteWiseSales = (filters?: SalesFilterPayload) =>
  useQuery({
    queryKey: ["route-sales", filters],
    queryFn: async () => {
      const query = new URLSearchParams((filters ?? {}) as any).toString();

      const { data } = await api.get(`/route-analysis/wise-sales?${query}`);

      return (
        data?.data?.map((item: any) => ({
          route: item.route_name,
          todaySales: item.today_sales ?? 0,
          yesterdaySales: item.yesterday_sales ?? 0,
          weeklySales: item.weekly_sales ?? 0,
          last14DaysSales: item.last_14_days_sales ?? 0,
          monthSales: item.month_sales ?? 0,
          quarterSales: item.quarter_sales ?? 0,
          yearSales: item.year_sales ?? 0,
        })) || []
      );
    },
  });

export const useRouteEfficiency = (filters?: SalesFilterPayload) =>
  useQuery({
    queryKey: ["route-efficiency", filters],
    queryFn: async () => {
      const query = new URLSearchParams((filters ?? {}) as any).toString();

      const { data } = await api.get(
        `/route-analysis/efficiency-overview?${query}`,
      );

      return (
        data?.data?.map((item: any, index: number) => ({
          sno: index + 1,
          route: item.route_name,
          warehouse: item.warehouse_name,
          salesman: item.salesman_name,

          totalCustomer: item.total_customer ?? 0,
          totalVisitDays: item.total_visit_days ?? 0,
          plannedVisit: item.planned_visit ?? 0,
          dropRate: item.drop_rate ?? 0,

          salesValue: item.sales_inv_value ?? 0,
          salesPerDay: item.sales_per_day ?? 0,

          totalCollection: item.total_collection ?? 0,
          collectionPerDay: item.collection_per_day ?? 0,
          pendingCollection: item.pending_collection ?? 0,
        })) || []
      );
    },
  });

// export const useRoutePerformance = (filters?: SalesFilterPayload) =>
//   useQuery({
//     queryKey: ["route-performance", filters],
//     queryFn: async () => {
//       const query = new URLSearchParams(filters as any).toString();
//       const { data } = await api.get(`/route-analysis/performance?${query}`);

//       const res = data?.data || {};

//       return {
//         tableData:
//           res?.table_data?.map((item: any) => ({
//             route: item.name,
//             totalSales: item.total_sales ?? 0,
//             totalCollection: item.total_collection ?? 0,
//           })) || [],

//         chartData: res?.chart_data || [],
//       };
//     },
//   });
