import { z } from "zod"

/* ========================================================================== */
/*                               FILTER SCHEMA                                */
/* ========================================================================== */

export const salesFilterSchema = z.object({
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),

  region: z.array(z.string()).optional(),

  warehouse: z.array(z.string()).optional(),

  sales_area: z.array(z.string()).optional(),

  route: z.array(z.string()).optional(),
})

export type SalesFilterFormValues = z.infer<typeof salesFilterSchema>



/* ========================================================================== */
/*                               FILTER PAYLOAD                               */
/* ========================================================================== */

export interface SalesFilterPayload {
  fromdate: string
  todate: string

  region_id: string
  warehouse_id: string
  sales_area_id: string
  route_id: string
}



/* ========================================================================== */
/*                            GENERIC API RESPONSE                            */
/* ========================================================================== */

export interface ApiResponse<T = any> {
  status: boolean
  message?: string
  data: T
}



/* ========================================================================== */
/*                             SELECT OPTION TYPE                             */
/* ========================================================================== */

export interface SelectOption {
  value: string
  label: string
}