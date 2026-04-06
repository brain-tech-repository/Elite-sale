import api from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

import {
  AutoCompleteOption,
  ChartSalesData,
  DashboardSummaryResponse,
  MasterApiResponse,
  SalesTrendItem,
  SalesTrendResponse,
  SelectOption,
} from "./types";
import React from "react";

/* ========================================================================== */
/*                              HELPER FUNCTIONS                              */
/* ========================================================================== */

/**
 * Convert Master API response to dropdown options
 */
const mapOptions = (data: MasterApiResponse): SelectOption[] => {
  if (!data?.Result) return [];

  return data.Result.map((item) => ({
    value: String(item.id),
    label: item.name,
  }));
};

/**
 * Convert sales trend API data to chart compatible data
 */
const transformChartData = (data: SalesTrendItem[]): ChartSalesData[] => {
  return data.map((item) => ({
    month: item.label,
    desktop: item.y,
  }));
};

/* ========================================================================== */
/*                                 API CALLS                                  */
/* ========================================================================== */

/**
 * Fetch dashboard summary cards
 */
const getDashboardSummaryCards = async (
  params?: any,
): Promise<DashboardSummaryResponse> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : "";

  const { data } = await api.post(`get_dashboard_summary_cards${query}`);

  return data;
};

/**
 * Fetch yearly sales trend
 */
const getYearlySalesTrend = async (
  year: string,
  filters?: any,
): Promise<SalesTrendResponse> => {
  const { month, ...restFilters } = filters || {};

  const params = { year, ...restFilters };

  const query = new URLSearchParams(params).toString();

  const { data } = await api.get(`get_yearly_sales_trend?${query}`);

  return data;
};

/**
 * Fetch monthly sales trend
 */
const getMonthlySalesTrend = async (
  year: string,
  month?: string | null,
  filters?: any,
): Promise<SalesTrendResponse> => {
  const params = { year, month, ...filters };

  const query = new URLSearchParams(params).toString();

  const { data } = await api.get(`get_monthly_sales_trend?${query}`);

  return data;
};
/**
 * Generic master API fetcher
 */
const fetchMaster = async (
  endpoint: string,
  params: Record<string, any> = {},
): Promise<MasterApiResponse> => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== "" && value !== undefined,
    ),
  );

  const query = new URLSearchParams(filteredParams).toString();

  const { data } = await api.post(`${endpoint}?${query}`);

  return data;
};

/**
 * Generic performance API fetcher
 */
const fetchPerformance = async (endpoint: string, params: any) => {
  const query = new URLSearchParams(params).toString();

  const { data } = await api.post(`${endpoint}?${query}`);

  return data;
};
const fetchPerformances = async (endpoint: string, params: any) => {
  const { data } = await api.post(endpoint, params);
  return data;
};

/* ========================================================================== */
/*                             TANSTACK QUERY HOOKS                           */
/* ========================================================================== */

/**
 * Dashboard Summary Hook
 */
export const useDashboardSummary = (filters?: any) => {
  return useQuery<DashboardSummaryResponse>({
    queryKey: ["dashboard-summary", filters],
    queryFn: () => getDashboardSummaryCards(filters),
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Yearly Sales Trend Hook
 */
export const useYearlySalesTrend = (year: string, filters?: any) => {
  const yearlyFilters = React.useMemo(() => {
    if (!filters) return {};

    const { month, ...rest } = filters;
    return rest;
  }, [filters]);

  return useQuery({
    queryKey: ["yearly-sales-trend", year, JSON.stringify(yearlyFilters)],

    queryFn: () => getYearlySalesTrend(year, yearlyFilters),

    select: (data) => transformChartData(data.Result),

    // keepPreviousData: true,
  });
};

/**
 * Monthly Sales Trend Hook
 */
export const useMonthlySalesTrend = (
  year: string,
  month?: string | null,
  filters?: any,
) => {
  return useQuery({
    queryKey: ["monthly-sales-trend", year, month, filters],

    queryFn: () => getMonthlySalesTrend(year, month, filters),

    select: (data) => transformChartData(data.Result),
  });
};

/* ========================================================================== */
/*                           GENERIC MASTER DROPDOWN HOOK                     */
/* ========================================================================== */

const useMasterDropdown = (
  key: string,
  endpoint: string,
  params: Record<string, any>,
  enabled = true,
) => {
  return useQuery<SelectOption[]>({
    queryKey: [key, ...Object.values(params)],

    queryFn: async () => {
      const data = await fetchMaster(endpoint, params);
      return mapOptions(data);
    },

    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

/* ========================================================================== */
/*                             MASTER DROPDOWN HOOKS                          */
/* ========================================================================== */

/**
 * Regions Dropdown
 */
export const useRegions = (search: string) =>
  useMasterDropdown("regions", "get_regions_list", { search });

/**
 * Warehouses Dropdown
 */
export const useWarehouses = (regionId: string, search: string) =>
  useMasterDropdown(
    "warehouses",
    "get_warehouses_list",
    { region_id: regionId, search },
    !!regionId,
  );

/**
 * Material Groups Dropdown
 */
export const useMaterialGroups = (search: string) =>
  useMasterDropdown("material-groups", "get_material_types_list", { search });

/**
 * Brands Dropdown
 */
export const useBrands = (materialTypeId: string, search: string) =>
  useMasterDropdown(
    "brands",
    "get_brands_list",
    { material_type_id: materialTypeId, search },
    !!materialTypeId,
  );

/**
 * Materials Dropdown
 */
export const useMaterials = (
  materialTypeId: string,
  brandId: string,
  search: string,
) =>
  useMasterDropdown(
    "materials",
    "get_materials_list",
    {
      material_type_id: materialTypeId,
      brand_id: brandId,
      search,
    },
    !!materialTypeId,
  );

/* ========================================================================== */
/*                         PERFORMANCE ANALYTICS HOOKS                        */
/* ========================================================================== */

/**
 * Region Performance
 */
export const useRegionPerformance = (filters: any, enabled = true) => {
  return useQuery({
    queryKey: ["region-performance", JSON.stringify(filters)],

    queryFn: async () => {
      const cleanedParams = Object.fromEntries(
        Object.entries(filters || {}).filter(
          ([_, v]) => v !== "" && v !== null && v !== undefined,
        ),
      );

      const res = await fetchPerformance(
        "get_region_performance",
        cleanedParams,
      );

      return res?.Result || [];
    },

    enabled: enabled && !!filters,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Brand Performance
 */
export const useBrandPerformance = (filters: any, enabled = true) => {
  return useQuery({
    queryKey: ["brand-performance", filters],
    queryFn: async () => {
      const res = await fetchPerformance("get_brand_performance", filters);
      return res?.Result || [];
    },
    enabled: enabled && !!filters,
  });
};

/**
 * Material Group Performance
 */
export const useMaterialGroupPerformance = (filters: any, enabled = true) => {
  return useQuery({
    queryKey: ["material-group-performance", filters],
    queryFn: async () => {
      const res = await fetchPerformance(
        "get_material_group_performance",
        filters,
      );
      return res?.Result || [];
    },
    enabled: enabled && !!filters,
  });
};

/**
 * Customer Segment Performance
 */
export const useCustomerSegmentPerformance = (filters: any, enabled = true) => {
  return useQuery({
    queryKey: ["customer-segment-performance", filters],
    queryFn: async () => {
      const res = await fetchPerformances(
        "get_customer_segment_performance",
        filters,
      );
      return res?.Result || [];
    },
    enabled: enabled && !!filters,
  });
};
export const useRegionLinePerformance = (enabled = true) => {
  return useQuery({
    queryKey: ["region-line-performance"],
    queryFn: () => fetchPerformance("get_region_performance", {}),
    staleTime: Infinity, // ✅ no refetch
    refetchOnWindowFocus: false, // ✅ no refetch on tab focus
    refetchOnMount: false, // no filters
    enabled,
  });
};

export const useBrandLinePerformance = (enabled = true) => {
  return useQuery({
    queryKey: ["brand-line-performance"],
    queryFn: () => fetchPerformance("get_brand_performance", {}),
    staleTime: Infinity, // ✅ no refetch
    refetchOnWindowFocus: false, // ✅ no refetch on tab focus
    refetchOnMount: false,
    enabled,
  });
};

export const useMaterialLinePerformance = (enabled = true) => {
  return useQuery({
    queryKey: ["material-line-performance"],
    queryFn: () => fetchPerformance("get_material_group_performance", {}),
    staleTime: Infinity, // ✅ no refetch
    refetchOnWindowFocus: false, // ✅ no refetch on tab focus
    refetchOnMount: false,
    enabled,
  });
};

export const useCustomerLinePerformance = (enabled = true) => {
  return useQuery({
    queryKey: ["customer-line-performance"],
    queryFn: () => fetchPerformances("get_customer_segment_performance", {}),
    staleTime: Infinity, // ✅ no refetch
    refetchOnWindowFocus: false, // ✅ no refetch on tab focus
    refetchOnMount: false,
    enabled,
  });
};

/**
 * Distributor Target vs Achieved Chart
 */
export const useDistributorChart = (
  year?: string,
  month?: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["distributor-chart", year, month], // ✅ cache per filter

    queryFn: async () => {
      const { data } = await api.post("distributor-chart-data", {
        params: {
          year,
          month,
        },
      });

      const labels = data?.data?.labels || [];
      const target = data?.data?.datasets?.[0]?.data || [];
      const achieved = data?.data?.datasets?.[1]?.data || [];

      return labels.map((name: string, index: number) => ({
        name,
        Target: target[index] || 0,
        Achievment: achieved[index] || 0,
      }));
    },

    // enabled: enabled && !!year && !!month, // ✅ only run when selected
    refetchOnWindowFocus: false,
  });
};
