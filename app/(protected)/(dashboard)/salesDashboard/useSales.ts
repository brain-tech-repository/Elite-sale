import api from "@/lib/apiClient"
import { useQuery } from "@tanstack/react-query"


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