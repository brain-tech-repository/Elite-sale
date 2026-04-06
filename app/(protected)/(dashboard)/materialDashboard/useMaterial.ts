import api from "@/lib/apiClient";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  SelectOption,
  SalesFilterPayload,
  MasterApiResponse,
  DashboardSummaryResponse,
} from "./types";

/* ========================================================================== */
/*                              HELPER FUNCTIONS                              */
/* ========================================================================== */

const transformMaterialFilters = (filters?: SalesFilterPayload) => {
  if (!filters) return {};

  return {
    from_date: filters.fromdate,
    to_date: filters.todate,
    warehouse: filters.warehouse_id,
    region: filters.region_id,
    brand: filters.brand_id,
    mat_group: filters.material_type_id,
    mat_list: filters.material_id,
  };
};

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

  const query = new URLSearchParams(
    transformMaterialFilters(params) as any,
  ).toString();

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

const getDashboardSummaryCards = async (
  params?: any,
): Promise<DashboardSummaryResponse> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : "";

  const { data } = await api.post(
    `material_analysis/fetch_summary_cards${query}`,
  );

  return data;
};

export const useDashboardSummary = (filters?: any) => {
  return useQuery<DashboardSummaryResponse>({
    queryKey: ["dashboard-summary", filters],
    queryFn: () => getDashboardSummaryCards(filters),
    staleTime: 1000 * 60 * 5,
  });
};

/* ========================================================================== */
/*                        MATERIAL ANALYSIS HOOKS                             */
/* ========================================================================== */

const BASE = "/material_analysis";

/* ========================= MATERIAL PERFORMANCE ========================= */

export const useMaterialPerformance = (
  filters?: SalesFilterPayload,
  page: number = 1,
  length: number = 10,
) =>
  useQuery({
    queryKey: ["material-performance", filters, page, length],
    queryFn: async () => {
      const query = new URLSearchParams({
        ...(filters ?? {}),
        page: String(page),
        length: String(length),
      } as Record<string, string>).toString();

      const { data } = await api.post(
        `${BASE}/fetch_material_performance?${query}`,
      );

      return {
        tableData: data?.data ?? [],
        pagination: data?.pagination ?? {},
      };
    },

    placeholderData: keepPreviousData, // ✅ correct
    refetchOnWindowFocus: false,
  });

/* ========================= ACTIVE SKUS ========================= */

export const useActiveSkus = (filters?: SalesFilterPayload) =>
  useQuery({
    queryKey: ["active-skus", filters],

    queryFn: async () => {
      const query = new URLSearchParams(
        Object.entries(filters || {}).reduce(
          (acc, [key, value]) => {
            if (value !== undefined && value !== null) {
              acc[key] = String(value);
            }
            return acc;
          },
          {} as Record<string, string>,
        ),
      ).toString();

      const { data } = await api.post(`${BASE}/fetch_active_skus?${query}`);

      return data?.data || [];
    },

    // enabled: !!filters, // 👈 optional (avoid initial empty call)
    refetchOnWindowFocus: false,
  });
/* ========================= INACTIVE SKUS ========================= */

export const useInactiveSkus = (filters?: SalesFilterPayload) =>
  useQuery({
    queryKey: ["inactive-skus", filters],

    queryFn: async () => {
      const query = new URLSearchParams(
        Object.entries(filters || {}).reduce(
          (acc, [key, value]) => {
            if (value !== undefined && value !== null) {
              acc[key] = String(value);
            }
            return acc;
          },
          {} as Record<string, string>,
        ),
      ).toString();

      const { data } = await api.post(`${BASE}/fetch_inactive_skus?${query}`);

      return data?.data || [];
    },

    // enabled: !!filters,
    refetchOnWindowFocus: false,
  });

/* ========================= SUMMARY CARDS ========================= */

export const useMaterialSummary = (filters?: SalesFilterPayload) =>
  useQuery({
    queryKey: ["material-summary", filters],

    queryFn: async () => {
      const query = new URLSearchParams(
        (filters ?? {}) as Record<string, string>,
      ).toString();

      const { data } = await api.post(`${BASE}/fetch_summary_cards?${query}`);

      return data?.data;
    },

    refetchOnWindowFocus: false,
  });

/* ========================= VOLUME GROWTH ========================= */
export const useVolumeGrowthChart = (filters?: SalesFilterPayload) =>
  useQuery({
    queryKey: ["volume-growth", filters],

    queryFn: async () => {
      const query = new URLSearchParams(
        Object.entries(filters || {}).reduce(
          (acc, [key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              acc[key] = String(value);
            }
            return acc;
          },
          {} as Record<string, string>,
        ),
      ).toString();

      const url = query
        ? `${BASE}/fetch_volume_growth_charts?${query}`
        : `${BASE}/fetch_volume_growth_charts`;

      const { data } = await api.post(url);

      return data?.data || { daily: [], monthly: [], yearly: [] };
    },

    refetchOnWindowFocus: false,
  });

/* ========================= VALUE GROWTH ========================= */

export const useValueGrowthChart = (filters?: SalesFilterPayload) =>
  useQuery({
    queryKey: ["value-growth", filters],

    queryFn: async () => {
      const query = new URLSearchParams(
        Object.entries(filters || {}).reduce(
          (acc, [key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              acc[key] = String(value);
            }
            return acc;
          },
          {} as Record<string, string>,
        ),
      ).toString();

      const url = query
        ? `${BASE}/fetch_value_growth_charts?${query}`
        : `${BASE}/fetch_value_growth_charts`;

      const { data } = await api.post(url);

      return data?.data || { daily: [], monthly: [], yearly: [] };
    },

    refetchOnWindowFocus: false,
  });

export const useTopMaterialByVolume = (filters?: SalesFilterPayload) =>
  useQuery({
    queryKey: ["top-material-volume", filters],
    queryFn: async () => {
      const query = new URLSearchParams(
        Object.entries(filters || {}).reduce(
          (acc, [key, value]) => {
            if (value !== undefined && value !== null) {
              acc[key] = String(value);
            }
            return acc;
          },
          {} as Record<string, string>,
        ),
      ).toString();

      const { data } = await api.post(
        `/material_analysis/fetch_top_material_by_volume?${query}`,
      );

      return data?.data || [];
    },
  });

export const useTopMaterialByValue = (filters?: SalesFilterPayload) =>
  useQuery({
    queryKey: ["top-material-value", filters],
    queryFn: async () => {
      const query = new URLSearchParams(
        Object.entries(filters || {}).reduce(
          (acc, [key, value]) => {
            if (value !== undefined && value !== null) {
              acc[key] = String(value);
            }
            return acc;
          },
          {} as Record<string, string>,
        ),
      ).toString();

      const { data } = await api.post(
        `/material_analysis/fetch_top_material_by_value?${query}`,
      );

      return data?.data || [];
    },
  });
