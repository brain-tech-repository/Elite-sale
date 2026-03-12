import api from "@/lib/apiClient"
import { useQuery } from "@tanstack/react-query"
import { AutoCompleteOption, ChartSalesData,  MasterApiResponse,  SalesTrendItem, SalesTrendResponse, SelectOption } from "./types"


/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export interface DashboardSummaryResult {
  today_sales: number
  total_sales: number
  today_collection: number
  total_collection: number
  today_return: number
  total_return: number
}

export interface DashboardSummaryResponse {
  API_Status: number
  Message: string
  Result: DashboardSummaryResult
}

/* -------------------------------------------------------------------------- */
/*                                API FUNCTION                                */
/* -------------------------------------------------------------------------- */

const getDashboardSummaryCards = async (params?: any): Promise<DashboardSummaryResponse> => {

  const query = params
    ? `?${new URLSearchParams(params).toString()}`
    : ""

  const { data } = await api.get(`get_dashboard_summary_cards${query}`)

  return data
}

/* -------------------------------------------------------------------------- */
/*                               TANSTACK HOOK                                */
/* -------------------------------------------------------------------------- */

export const useDashboardSummary = (filters?: any) => {
  return useQuery<DashboardSummaryResponse>({
    queryKey: ["dashboard-summary", filters],
    queryFn: () => getDashboardSummaryCards(filters),
    staleTime: 1000 * 60 * 5,
  })
}
const getYearlySalesTrend = async (
  year: string,
  filters?: any
): Promise<SalesTrendResponse> => {

  const params = {
    year,
    ...filters,
  }

  const query = new URLSearchParams(params).toString()

  const { data } = await api.get(`get_yearly_sales_trend?${query}`)

  return data
}

const getMonthlySalesTrend = async (
  year: string,
  filters?: any
): Promise<SalesTrendResponse> => {

  const params = {
    year,
    ...filters,
  }

  const query = new URLSearchParams(params).toString()

  const { data } = await api.get(`get_monthly_sales_trend?${query}`)

  return data
}

/* ================= TRANSFORM FUNCTION ================= */

const transformChartData = (data: SalesTrendItem[]): ChartSalesData[] => {
  return data.map((item) => ({
    month: item.label,
    desktop: item.y,
  }))
}

/* ================= TANSTACK QUERIES ================= */

export const useYearlySalesTrend = (
  year: string,
  filters?: any
) => {
  return useQuery({
    queryKey: ["yearly-sales-trend", year, filters],
    queryFn: () => getYearlySalesTrend(year, filters),
    select: (data) => transformChartData(data.Result),
  })
}

export const useMonthlySalesTrend = (
  year: string,
  filters?: any
) => {
  return useQuery({
    queryKey: ["monthly-sales-trend", year, filters],
    queryFn: () => getMonthlySalesTrend(year, filters),
    select: (data) => transformChartData(data.Result),
  })
}




const mapOptions = (data: MasterApiResponse): SelectOption[] => {
  if (!data?.Result) return []

  return data.Result.map((item) => ({
    value: String(item.id), // convert id to string for MultiSelect
    label: item.name,
  }))
}

/* -------------------------------------------------------------------------- */
/*                                API CALL                                    */
/* -------------------------------------------------------------------------- */

const fetchMaster = async (
  endpoint: string,
  params: Record<string, any> = {}
): Promise<MasterApiResponse> => {

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== "" && value !== undefined)
  )

  const query = new URLSearchParams(filteredParams).toString()

  const { data } = await api.get(`${endpoint}?${query}`)

  return data
}

/* -------------------------------------------------------------------------- */
/*                               GENERIC HOOK                                 */
/* -------------------------------------------------------------------------- */

const useMasterDropdown = (
  key: string,
  endpoint: string,
  params: Record<string, any>,
  enabled = true
) => {

  return useQuery<SelectOption[]>({
    queryKey: [key, ...Object.values(params)],
    queryFn: async () => {
      const data = await fetchMaster(endpoint, params)
      return mapOptions(data)
    },
    enabled,
    staleTime: 1000 * 60 * 5,
  })

}

/* -------------------------------------------------------------------------- */
/*                              SPECIFIC HOOKS                                */
/* -------------------------------------------------------------------------- */

export const useRegions = (search: string) =>
  useMasterDropdown("regions", "get_regions_list", { search })

export const useWarehouses = (regionId: string, search: string) =>
  useMasterDropdown(
    "warehouses",
    "get_warehouses_list",
    { region_id: regionId, search },
    !!regionId
  )

export const useMaterialGroups = (search: string) =>
  useMasterDropdown(
    "material-groups",
    "get_material_types_list",
    { search }
  )

export const useBrands = (materialTypeId: string, search: string) =>
  useMasterDropdown(
    "brands",
    "get_brands_list",
    { material_type_id: materialTypeId, search },
    !!materialTypeId
  )

export const useMaterials = (
  materialTypeId: string,
  brandId: string,
  search: string
) =>
  useMasterDropdown(
    "materials",
    "get_materials_list",
    {
      material_type_id: materialTypeId,
      brand_id: brandId,
      search,
    },
    !!materialTypeId
  )

const fetchPerformance = async (endpoint: string, params: any) => {
  const query = new URLSearchParams(params).toString()

  const { data } = await api.get(`${endpoint}?${query}`)

  return data
}

export const useRegionPerformance = (filters: any) => {
  return useQuery({
    queryKey: ["region-performance", filters],
    queryFn: () =>
      fetchPerformance("get_region_performance", filters),
    enabled: !!filters,
  })
}

export const useBrandPerformance = (filters: any) => {
  return useQuery({
    queryKey: ["brand-performance", filters],
    queryFn: () =>
      fetchPerformance("get_brand_performance", filters),
    enabled: !!filters,
  })
}

export const useMaterialGroupPerformance = (filters: any) => {
  return useQuery({
    queryKey: ["material-group-performance", filters],
    queryFn: () =>
      fetchPerformance("get_material_group_performance", filters),
    enabled: !!filters,
  })
}

export const useCustomerSegmentPerformance = (filters: any) => {
  return useQuery({
    queryKey: ["customer-segment-performance", filters],
    queryFn: () =>
      fetchPerformance("get_customer_segment_performance", filters),
    enabled: !!filters,
  })
}