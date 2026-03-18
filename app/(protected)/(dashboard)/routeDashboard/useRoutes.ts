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
