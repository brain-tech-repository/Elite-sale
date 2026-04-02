// import api from "@/lib/apiClient";
// import { useQuery } from "@tanstack/react-query";

// import {
//   AutoCompleteOption,
//   ChartSalesData,
//   DashboardSummaryResponse,
//   MasterApiResponse,
//   SalesTrendItem,
//   SalesTrendResponse,
//   SelectOption,
// } from "./types";
// import React from "react";

// /* ========================================================================== */
// /*                              HELPER FUNCTIONS                              */
// /* ========================================================================== */

// /**
//  * Convert Master API response to dropdown options
//  */
// const mapOptions = (data: MasterApiResponse): SelectOption[] => {
//   if (!data?.Result) return [];

//   return data.Result.map((item) => ({
//     value: String(item.id),
//     label: item.name,
//   }));
// };

// /**
//  * Convert sales trend API data to chart compatible data
//  */
// const transformChartData = (data: SalesTrendItem[]): ChartSalesData[] => {
//   return data.map((item) => ({
//     month: item.label,
//     desktop: item.y,
//   }));
// };

// /* ========================================================================== */
// /*                                 API CALLS                                  */
// /* ========================================================================== */

// /**
//  * Fetch dashboard summary cards
//  */
// const getDashboardSummaryCards = async (
//   params?: any,
// ): Promise<DashboardSummaryResponse> => {
//   const query = params ? `?${new URLSearchParams(params).toString()}` : "";

//   const { data } = await api.get(`get_dashboard_summary_cards${query}`);

//   return data;
// };

// /**
//  * Fetch yearly sales trend
//  */
// const getYearlySalesTrend = async (
//   year: string,
//   filters?: any,
// ): Promise<SalesTrendResponse> => {
//   const { month, ...restFilters } = filters || {};

//   const params = { year, ...restFilters };

//   const query = new URLSearchParams(params).toString();

//   const { data } = await api.get(`get_yearly_sales_trend?${query}`);

//   return data;
// };

// /**
//  * Fetch monthly sales trend
//  */
// const getMonthlySalesTrend = async (
//   year: string,
//   month?: string | null,
//   filters?: any,
// ): Promise<SalesTrendResponse> => {
//   const params = { year, month, ...filters };

//   const query = new URLSearchParams(params).toString();

//   const { data } = await api.get(`get_monthly_sales_trend?${query}`);

//   return data;
// };
// /**
//  * Generic master API fetcher
//  */
// const fetchMaster = async (
//   endpoint: string,
//   params: Record<string, any> = {},
// ): Promise<MasterApiResponse> => {
//   const filteredParams = Object.fromEntries(
//     Object.entries(params).filter(
//       ([_, value]) => value !== "" && value !== undefined,
//     ),
//   );

//   const query = new URLSearchParams(filteredParams).toString();

//   const { data } = await api.get(`${endpoint}?${query}`);

//   return data;
// };

// /**
//  * Generic performance API fetcher
//  */
// const fetchPerformance = async (endpoint: string, params: any) => {
//   const cleanedParams: Record<string, string> = Object.fromEntries(
//     Object.entries(params || {})
//       .filter(([_, v]) => v !== "" && v !== null && v !== undefined)
//       .map(([k, v]) => [k, String(v)]), // ✅ FIX: convert to string
//   );

//   const query = new URLSearchParams(cleanedParams).toString();

//   const { data } = await api.get(`${endpoint}?${query}`);

//   return data;
// };

// /* ========================================================================== */
// /*                             TANSTACK QUERY HOOKS                           */
// /* ========================================================================== */

// /**
//  * Dashboard Summary Hook
//  */
// export const useDashboardSummary = (filters?: any) => {
//   return useQuery<DashboardSummaryResponse>({
//     queryKey: ["dashboard-summary", filters?.from_date, filters?.to_date],
//     queryFn: () => getDashboardSummaryCards(filters),
//     staleTime: 1000 * 60 * 5,
//   });
// };

// /**
//  * Yearly Sales Trend Hook
//  */
// export const useYearlySalesTrend = (year: string, filters?: any) => {
//   const yearlyFilters = React.useMemo(() => {
//     if (!filters) return {};

//     const { month, ...rest } = filters;
//     return rest;
//   }, [filters]);

//   return useQuery({
//     queryKey: ["yearly-sales-trend", year, JSON.stringify(yearlyFilters)],

//     queryFn: () => getYearlySalesTrend(year, yearlyFilters),

//     select: (data) => transformChartData(data.Result),

//     // keepPreviousData: true,
//   });
// };

// /**
//  * Monthly Sales Trend Hook
//  */
// export const useMonthlySalesTrend = (
//   year: string,
//   month?: string | null,
//   filters?: any,
// ) => {
//   return useQuery({
//     queryKey: ["monthly-sales-trend", year, month, filters?.from_date, filters?.to_date],

//     queryFn: () => getMonthlySalesTrend(year, month, filters),

//     select: (data) => transformChartData(data.Result),
//   });
// };

// /* ========================================================================== */
// /*                           GENERIC MASTER DROPDOWN HOOK                     */
// /* ========================================================================== */

// const useMasterDropdown = (
//   key: string,
//   endpoint: string,
//   params: Record<string, any>,
//   enabled = true,
// ) => {
//   return useQuery<SelectOption[]>({
//     queryKey: [key, ...Object.values(params)],

//     queryFn: async () => {
//       const data = await fetchMaster(endpoint, params);
//       return mapOptions(data);
//     },

//     enabled,
//     staleTime: 1000 * 60 * 5,
//   });
// };

// /* ========================================================================== */
// /*                             MASTER DROPDOWN HOOKS                          */
// /* ========================================================================== */

// /**
//  * Regions Dropdown
//  */
// export const useRegions = (search: string) =>
//   useMasterDropdown("regions", "get_regions_list", { search });

// /**
//  * Warehouses Dropdown
//  */
// export const useWarehouses = (regionId: string, search: string) =>
//   useMasterDropdown(
//     "warehouses",
//     "get_warehouses_list",
//     { region_id: regionId, search },
//     !!regionId,
//   );

// /**
//  * Material Groups Dropdown
//  */
// export const useMaterialGroups = (search: string) =>
//   useMasterDropdown("material-groups", "get_material_types_list", { search });

// /**
//  * Brands Dropdown
//  */
// export const useBrands = (materialTypeId: string, search: string) =>
//   useMasterDropdown(
//     "brands",
//     "get_brands_list",
//     { material_type_id: materialTypeId, search },
//     !!materialTypeId,
//   );

// /**
//  * Materials Dropdown
//  */
// export const useMaterials = (
//   materialTypeId: string,
//   brandId: string,
//   search: string,
// ) =>
//   useMasterDropdown(
//     "materials",
//     "get_materials_list",
//     {
//       material_type_id: materialTypeId,
//       brand_id: brandId,
//       search,
//     },
//     !!materialTypeId,
//   );

// /* ========================================================================== */
// /*                         PERFORMANCE ANALYTICS HOOKS                        */
// /* ========================================================================== */

// /**
//  * Region Performance
//  */
// export const useRegionPerformance = (filters: any, page = 1) => {
//   return useQuery({
//     // queryKey: ["region-performance", filters, page],
//     queryKey: ["region-performance", JSON.stringify(filters), page],
//     queryFn: async () => {
//       const res = await fetchPerformance("get_region_performance", {
//         ...filters,
//         page,
//         per_page: 5, // ✅ ADD THIS
//       });

//       return (
//         res?.Result || {
//           table_data: [],
//           pagination: {},
//         }
//       );
//     },
//     // placeholderData: (prev) => prev, // ✅ FIX (v5)
//   });
// };

// /**
//  * Brand Performance
//  */
// export const useBrandPerformance = (filters: any, page = 1) => {
//   return useQuery({
//     // queryKey: ["brand-performance", filters, page],
//     queryKey: ["brand-performance", JSON.stringify(filters), page],
//     queryFn: async () => {
//       const res = await fetchPerformance("get_brand_performance", {
//         ...filters,
//         page,
//         per_page: 5, // ✅ ADD
//       });

//       return (
//         res?.Result || {
//           table_data: [],
//           pagination: {},
//         }
//       );
//     },
//     // placeholderData: (prev) => prev, // ✅ FIX (v5)
//   });
// };

// /**
//  * Material Group Performance
//  */
// export const useMaterialGroupPerformance = (filters: any, page = 1) => {
//   return useQuery({
//     // queryKey: ["material-group-performance", filters, page],

//     queryKey: ["material-group-performance", JSON.stringify(filters), page],

//     queryFn: async () => {
//       const res = await fetchPerformance("get_material_group_performance", {
//         ...filters,
//         page,
//         per_page: 5, // ✅ ADD THIS
//       });

//       return (
//         res?.Result || {
//           table_data: [],
//           pagination: {},
//         }
//       );
//     },
//     // placeholderData: (prev) => prev, // ✅ FIX (v5)
//   });
// };
// /**
//  * Customer Segment Performance
//  */
// export const useCustomerSegmentPerformance = (filters: any, page = 1) => {
//   return useQuery({
//     // queryKey: ["customer-segment-performance", filters, page],

//     queryKey: ["customer-segment-performance", JSON.stringify(filters), page],
//     queryFn: async () => {
//       const res = await fetchPerformance("get_customer_segment_performance", {
//         ...filters,
//         page,
//         per_page: 5, // ✅ ADD
//       });

//       return (
//         res?.Result || {
//           table_data: [],
//           pagination: {},
//         }
//       );
//     },
//     // placeholderData: (prev) => prev, // ✅ FIX (v5)
//   });
// };
// export const useRegionLinePerformance = () => {
//   return useQuery({
//     queryKey: ["region-line-performance"],
//     queryFn: () => fetchPerformance("get_region_performance", {}),
//     staleTime: Infinity, // ✅ no refetch
//     refetchOnWindowFocus: false, // ✅ no refetch on tab focus
//     refetchOnMount: false, // no filters
//   });
// };

// export const useBrandLinePerformance = () => {
//   return useQuery({
//     queryKey: ["brand-line-performance"],
//     queryFn: () => fetchPerformance("get_brand_performance", {}),
//     staleTime: Infinity, // ✅ no refetch
//     refetchOnWindowFocus: false, // ✅ no refetch on tab focus
//     refetchOnMount: false,
//   });
// };

// export const useMaterialLinePerformance = () => {
//   return useQuery({
//     queryKey: ["material-line-performance"],
//     queryFn: () => fetchPerformance("get_material_group_performance", {}),

//     staleTime: Infinity, // ✅ no refetch
//     refetchOnWindowFocus: false, // ✅ no refetch on tab focus
//     refetchOnMount: false,
//   });
// };

// export const useCustomerLinePerformance = () => {
//   return useQuery({
//     queryKey: ["customer-line-performance"],
//     queryFn: () => fetchPerformance("get_customer_segment_performance", {}),

//     staleTime: Infinity, // ✅ no refetch
//     refetchOnWindowFocus: false, // ✅ no refetch on tab focus
//     refetchOnMount: false,
//   });
// };

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

  const { data } = await api.get(`get_dashboard_summary_cards${query}`);

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

  const { data } = await api.get(`${endpoint}?${query}`);

  return data;
};

/**
 * Generic performance API fetcher
 */
const fetchPerformance = async (endpoint: string, params: any) => {
  const query = new URLSearchParams(params).toString();

  const { data } = await api.get(`${endpoint}?${query}`);

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
    queryKey: ["dashboard-summary", filters?.from_date, filters?.to_date],
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
    queryKey: [
      "monthly-sales-trend",
      year,
      month,
      filters?.from_date,
      filters?.to_date,
    ],

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
export const useRegionPerformance = (filters: any) => {
  return useQuery({
    queryKey: ["region-performance", filters?.from_date, filters?.to_date],

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

    enabled: !!filters,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Brand Performance
 */
export const useBrandPerformance = (filters: any) => {
  return useQuery({
    queryKey: ["brand-performance", filters?.from_date, filters?.to_date],
    queryFn: async () => {
      const res = await fetchPerformance("get_brand_performance", filters);
      return res?.Result || [];
    },
    enabled: !!filters,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Material Group Performance
 */
export const useMaterialGroupPerformance = (filters: any) => {
  return useQuery({
    queryKey: [
      "material-group-performance",
      filters?.from_date,
      filters?.to_date,
    ],
    queryFn: async () => {
      const res = await fetchPerformance(
        "get_material_group_performance",
        filters,
      );
      return res?.Result || [];
    },
    enabled: !!filters,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Customer Segment Performance
 */
export const useCustomerSegmentPerformance = (filters: any) => {
  return useQuery({
    queryKey: [
      "customer-segment-performance",
      filters?.from_date,
      filters?.to_date,
    ],
    queryFn: async () => {
      const res = await fetchPerformance(
        "get_customer_segment_performance",
        filters,
      );
      return res?.Result || [];
    },
    enabled: !!filters,
    staleTime: 5 * 60 * 1000,
  });
};
export const useRegionLinePerformance = () => {
  return useQuery({
    queryKey: ["region-line-performance"],
    queryFn: () => fetchPerformance("get_region_performance", {}),
    staleTime: Infinity, // ✅ no refetch
    refetchOnWindowFocus: false, // ✅ no refetch on tab focus
    refetchOnMount: false, // no filters
  });
};

export const useBrandLinePerformance = () => {
  return useQuery({
    queryKey: ["brand-line-performance"],
    queryFn: () => fetchPerformance("get_brand_performance", {}),
    staleTime: Infinity, // ✅ no refetch
    refetchOnWindowFocus: false, // ✅ no refetch on tab focus
    refetchOnMount: false,
  });
};

export const useMaterialLinePerformance = () => {
  return useQuery({
    queryKey: ["material-line-performance"],
    queryFn: () => fetchPerformance("get_material_group_performance", {}),
    staleTime: Infinity, // ✅ no refetch
    refetchOnWindowFocus: false, // ✅ no refetch on tab focus
    refetchOnMount: false,
  });
};

export const useCustomerLinePerformance = () => {
  return useQuery({
    queryKey: ["customer-line-performance"],
    queryFn: () => fetchPerformance("get_customer_segment_performance", {}),
    staleTime: Infinity, // ✅ no refetch
    refetchOnWindowFocus: false, // ✅ no refetch on tab focus
    refetchOnMount: false,
  });
};
