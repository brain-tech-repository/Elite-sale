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