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


export interface SalesTrendItem {
  label: string
  y: number
}

export interface SalesTrendResponse {
  API_Status: number
  Message: string
  Result: SalesTrendItem[]
}

/* Chart formatted type */
export interface ChartSalesData {
  month: string
  desktop: number
}

export interface MasterItem {
  id: number
  name: string
}

export interface MasterApiResponse {
  API_Status: number
  Message: string
  Result: MasterItem[]
}

export interface AutoCompleteOption {
  value: number | string
  label: string
}

export interface SelectOption {
  value: string
  label: string
}

