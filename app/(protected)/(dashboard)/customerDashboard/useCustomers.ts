import api from "@/lib/apiClient"
import { useQuery } from "@tanstack/react-query"

import { ApiResponse, SelectOption } from "./types"



/* ========================================================================== */
/*                              HELPER FUNCTION                               */
/* ========================================================================== */

const mapOptions = (data: ApiResponse<any[]>): SelectOption[] => {
  if (!data?.data) return []

  return data.data.map((item: any) => ({
    value: String(item.id),
    label:
      item.region_name ||
      item.warehouse_name ||
      item.sales_area_name ||
      item.route_name ||
      "Unknown",
  }))
}



/* ========================================================================== */
/*                               MASTER FETCHER                               */
/* ========================================================================== */

const fetchMaster = async (
  endpoint: string,
  params: Record<string, any> = {}
) => {

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== "" && value !== undefined
    )
  )

  const query = new URLSearchParams(filteredParams).toString()

  const url = query ? `${endpoint}?${query}` : endpoint

  const { data } = await api.get(url)

  return data
}



/* ========================================================================== */
/*                           FILTER DROPDOWN HOOKS                            */
/* ========================================================================== */


/* REGIONS */

export const useRegions = () =>
  useQuery<SelectOption[]>({
    queryKey: ["regions"],

    queryFn: async () => {
      const data = await fetchMaster(
        "/dashboard/customer/filters/regions"
      )

      return mapOptions(data)
    },

    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })



/* WAREHOUSES */

export const useWarehouses = (regionId: string) =>
  useQuery<SelectOption[]>({
    queryKey: ["warehouses", regionId],

    queryFn: async () => {
      const data = await fetchMaster(
        "/dashboard/customer/filters/warehouses",
        { region_id: regionId }
      )

      return mapOptions(data)
    },

    enabled: !!regionId,
    refetchOnWindowFocus: false,
  })



/* SALES AREAS */

export const useSalesAreas = (warehouseId: string) =>
  useQuery<SelectOption[]>({
    queryKey: ["sales-areas", warehouseId],

    queryFn: async () => {
      const data = await fetchMaster(
        "/dashboard/customer/filters/sales-areas",
        { warehouse_id: warehouseId }
      )

      return mapOptions(data)
    },

    enabled: !!warehouseId,
    refetchOnWindowFocus: false,
  })



/* ROUTES */

export const useRoutes = (salesAreaId: string) =>
  useQuery<SelectOption[]>({
    queryKey: ["routes", salesAreaId],

    queryFn: async () => {
      const data = await fetchMaster(
        "/dashboard/customer/filters/routes",
        { sales_area_id: salesAreaId }
      )

      return mapOptions(data)
    },

    enabled: !!salesAreaId,
    refetchOnWindowFocus: false,
  })



/* ========================================================================== */
/*                             DASHBOARD SUMMARY                              */
/* ========================================================================== */

export const useDashboardSummary = (filters?: any) =>
  useQuery({
    queryKey: ["customer-summary", JSON.stringify(filters)],

    queryFn: async () => {
      const query = new URLSearchParams(filters || {}).toString()

      const { data } = await api.get(
        `/dashboard/customer/summary?${query}`
      )

      return data
    },

    refetchOnWindowFocus: false,
  })



/* ========================================================================== */
/*                              MONTHLY TREND                                 */
/* ========================================================================== */

export const useMonthlyTrend = (filters?: any) =>
  useQuery({
    queryKey: ["customer-monthly-trend", JSON.stringify(filters)],

    queryFn: async () => {
      const query = new URLSearchParams(filters || {}).toString()

      const { data } = await api.get(
        `/dashboard/customer/monthly-trend?${query}`
      )

      return data?.data?.map((item: any) => ({
        month: item.label,
        desktop: item.y,
      })) || []
    },

    refetchOnWindowFocus: false,
  })



/* ========================================================================== */
/*                           REGION PERFORMANCE                               */
/* ========================================================================== */

export const useRegionPerformance = (filters?: any) =>
  useQuery({
    queryKey: ["customer-by-region", JSON.stringify(filters)],

    queryFn: async () => {
      const query = new URLSearchParams(filters || {}).toString()

      const { data } = await api.get(
        `/dashboard/customer/by-region?${query}`
      )

      const categories = data?.data?.cat || []
      const series = data?.data?.ser || []

      const chartData = categories.map((cat: string, index: number) => {
        const row: any = { category: cat }

        series.forEach((s: any) => {
          row[s.name] = s.data[index] || 0
        })

        return row
      })

      return {
        chartData,
        regions: series.map((s: any) => s.name),
      }
    },

    refetchOnWindowFocus: false,
  })