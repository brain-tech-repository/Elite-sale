"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "sonner"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"

import { Calendar } from "@/components/ui/calendar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import {
  useRegions,
  useWarehouses,
  useSalesAreas,
  useRoutes,
} from "../useCustomers"

import { MultiSelect } from "@/components/ui/multi-select"

import {
  SalesFilterFormValues,
  SalesFilterPayload,
  salesFilterSchema,
} from "../types"



/* ========================================================================== */
/*                                   PROPS                                    */
/* ========================================================================== */

type Props = {
  onFilter: (filters: SalesFilterPayload) => void
}



/* ========================================================================== */
/*                                 COMPONENT                                  */
/* ========================================================================== */

export default function MyForm({ onFilter }: Props) {

  const form = useForm<SalesFilterFormValues>({
    resolver: zodResolver(salesFilterSchema),
    defaultValues: {
      dateRange: undefined,
      region: [],
      warehouse: [],
      sales_area: [],
      route: [],
    },
  })


  /* WATCH VALUES */

  const regionValue = form.watch("region")
  const warehouseValue = form.watch("warehouse")
  const salesAreaValue = form.watch("sales_area")


  /* API DATA */

  const { data: regions = [] } = useRegions()

  const { data: warehouses = [] } = useWarehouses(
    regionValue?.join(",") || "0"
  )

  const { data: salesAreas = [] } = useSalesAreas(
    warehouseValue?.join(",") || "0"
  )

  const { data: routes = [] } = useRoutes(
    salesAreaValue?.join(",") || "0"
  )


  /* RESET DEPENDENT FIELDS */

  useEffect(() => {
    form.setValue("warehouse", [])
    form.setValue("sales_area", [])
    form.setValue("route", [])
  }, [regionValue])

  useEffect(() => {
    form.setValue("sales_area", [])
    form.setValue("route", [])
  }, [warehouseValue])

  useEffect(() => {
    form.setValue("route", [])
  }, [salesAreaValue])



  /* ====================================================================== */
  /*                                  SUBMIT                                */
  /* ====================================================================== */

  function onSubmit(values: SalesFilterFormValues) {

    if (!values.dateRange?.from || !values.dateRange?.to) {
      toast.error("Please select date range")
      return
    }

    const filters: SalesFilterPayload = {
      fromdate: format(values.dateRange.from, "yyyy-MM-dd"),
      todate: format(values.dateRange.to, "yyyy-MM-dd"),

      region_id: values.region?.join(",") || "0",
      warehouse_id: values.warehouse?.join(",") || "0",
      sales_area_id: values.sales_area?.join(",") || "0",
      route_id: values.route?.join(",") || "0",
    }

    onFilter(filters)

    toast.success("Filters applied")
  }



  /* ====================================================================== */
  /*                                   UI                                   */
  /* ====================================================================== */

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-7xl mx-auto py-4 px-2"
      >

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

          {/* DATE RANGE */}

          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => {

              const dateRange = field.value as DateRange | undefined
              const isDateSelected = dateRange?.from && dateRange?.to

              return (
                <FormItem>

                  <FormLabel>Date Range</FormLabel>

                  <Popover>

                    <PopoverTrigger asChild>

                      <Button
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal shadow-lg w-full",
                          !dateRange?.from && "text-muted-foreground"
                        )}
                      >

                        {isDateSelected
                          ? `${format(dateRange.from!, "dd/MM/yy")} - ${format(
                              dateRange.to!,
                              "dd/MM/yy"
                            )}`
                          : "Pick a date range"}

                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />

                      </Button>

                    </PopoverTrigger>

                    <PopoverContent align="start" className="p-0 w-auto">

                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={(range) => field.onChange(range)}
                        initialFocus
                      />

                    </PopoverContent>

                  </Popover>

                  <FormMessage />

                </FormItem>
              )
            }}
          />


          {/* REGION */}

          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Region</FormLabel>

                <MultiSelect
                  options={regions}
                  defaultValue={form.getValues("region")}
                  onValueChange={field.onChange}
                />

                <FormMessage />

              </FormItem>
            )}
          />


          {/* WAREHOUSE */}

          <FormField
            control={form.control}
            name="warehouse"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Warehouse</FormLabel>

                <MultiSelect
                  options={warehouses}
                  defaultValue={form.getValues("warehouse")}
                  onValueChange={field.onChange}
                  disabled={!regionValue?.length}
                />

                <FormMessage />

              </FormItem>
            )}
          />


          {/* SALES AREA */}

          <FormField
            control={form.control}
            name="sales_area"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Sales Area</FormLabel>

                <MultiSelect
                  options={salesAreas}
                  defaultValue={form.getValues("sales_area")}
                  onValueChange={field.onChange}
                  disabled={!warehouseValue?.length}
                />

                <FormMessage />

              </FormItem>
            )}
          />


          {/* ROUTE */}

          <FormField
            control={form.control}
            name="route"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Route</FormLabel>

                <MultiSelect
                  options={routes}
                  defaultValue={form.getValues("route")}
                  onValueChange={field.onChange}
                  disabled={!salesAreaValue?.length}
                />

                <FormMessage />

              </FormItem>
            )}
          />

        </div>


        {/* BUTTONS */}

        <div className="flex gap-6 pt-2">

          <Button type="submit" variant="outline" className="shadow-lg">
            Filter
          </Button>

          <Button
            type="button"
            variant="outline"
            className="shadow-lg"
            onClick={() => form.reset()}
          >
            Reset
          </Button>

        </div>

      </form>
    </Form>
  )
}