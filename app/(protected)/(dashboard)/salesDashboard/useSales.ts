import api from "@/lib/apiClient"
import { useQuery } from "@tanstack/react-query"
import { AutoCompleteOption, ChartSalesData, MasterApiResponse, SalesTrendItem, SalesTrendResponse } from "./types"


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

const getDashboardSummaryCards = async (): Promise<DashboardSummaryResponse> => {
  const { data } = await api.get("get_dashboard_summary_cards")
  return data
}

/* -------------------------------------------------------------------------- */
/*                               TANSTACK HOOK                                */
/* -------------------------------------------------------------------------- */

export const useDashboardSummary = () => {
  return useQuery<DashboardSummaryResponse>({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummaryCards,
    staleTime: 1000 * 60 * 5,
  })
}

const getYearlySalesTrend = async (year: string): Promise<SalesTrendResponse> => {
  const { data } = await api.get(`get_yearly_sales_trend?year=${year}`)
  return data
}

const getMonthlySalesTrend = async (year: string): Promise<SalesTrendResponse> => {
  const { data } = await api.get(`get_monthly_sales_trend?year=${year}`)
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

export const useYearlySalesTrend = (year: string) => {
  return useQuery({
    queryKey: ["yearly-sales-trend", year],
    queryFn: () => getYearlySalesTrend(year),
    select: (data) => transformChartData(data.Result),
  })
}

export const useMonthlySalesTrend = (year: string) => {
  return useQuery({
    queryKey: ["monthly-sales-trend", year],
    queryFn: () => getMonthlySalesTrend(year),
    select: (data) => transformChartData(data.Result),
  })
}





/* -------------------------------------------------------------------------- */
/*                                   API                                      */
/* -------------------------------------------------------------------------- */

const getRegions = async (search = ""): Promise<MasterApiResponse> => {
  const { data } = await api.get(`get_regions_list?search=${search}`)
  return data
}

const getWarehouses = async (search = ""): Promise<MasterApiResponse> => {
  const { data } = await api.get(`get_warehouses_list?search=${search}`)
  return data
}

const getBrands = async (search = ""): Promise<MasterApiResponse> => {
  const { data } = await api.get(`get_brands_list?search=${search}`)
  return data
}

const getMaterialGroups = async (search = ""): Promise<MasterApiResponse> => {
  const { data } = await api.get(`get_material_groups_list?search=${search}`)
  return data
}

const getMaterials = async (search = ""): Promise<MasterApiResponse> => {
  const { data } = await api.get(`get_materials_list?search=${search}`)
  return data
}

/* -------------------------------------------------------------------------- */
/*                              DATA TRANSFORM                                */
/* -------------------------------------------------------------------------- */

const mapOptions = (data: MasterApiResponse): AutoCompleteOption[] => {
  if (!data?.Result) return []

  return data.Result.map((item) => ({
    value: item.id,
    label: item.name,
  }))
}

/* -------------------------------------------------------------------------- */
/*                               TANSTACK HOOKS                               */
/* -------------------------------------------------------------------------- */

export const useRegions = (search: string) => {
  return useQuery({
    queryKey: ["regions", search],
    queryFn: () => getRegions(search),
    select: mapOptions,
    staleTime: 1000 * 60 * 5,
  })
}

export const useWarehouses = (search: string) => {
  return useQuery({
    queryKey: ["warehouses", search],
    queryFn: () => getWarehouses(search),
    select: mapOptions,
    staleTime: 1000 * 60 * 5,
  })
}

export const useBrands = (search: string) => {
  return useQuery({
    queryKey: ["brands", search],
    queryFn: () => getBrands(search),
    select: mapOptions,
    staleTime: 1000 * 60 * 5,
  })
}

export const useMaterialGroups = (search: string) => {
  return useQuery({
    queryKey: ["material-groups", search],
    queryFn: () => getMaterialGroups(search),
    select: mapOptions,
    staleTime: 1000 * 60 * 5,
  })
}

export const useMaterials = (search: string) => {
  return useQuery({
    queryKey: ["materials", search],
    queryFn: () => getMaterials(search),
    select: mapOptions,
    staleTime: 1000 * 60 * 5,
  })
}