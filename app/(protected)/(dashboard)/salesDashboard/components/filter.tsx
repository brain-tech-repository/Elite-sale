"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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

/* HOOKS */

import {
  useRegions,
  useWarehouses,
  useBrands,
  useMaterialGroups,
  useMaterials,
} from "../useSales"
import { MultiSelect } from "@/components/ui/multi-select"

/* =========================
   SCHEMA
========================= */

const formSchema = z.object({
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),

  region: z.array(z.string()).optional(),

  warehouse: z.array(z.string()).optional(),

  Brand: z.array(z.string()).optional(),

  material_group: z.array(z.string()).optional(),

  material: z.array(z.string()).optional(),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
  onFilter: (filters: any) => void
}

/* =========================
   COMPONENT
========================= */

export default function MyForm({ onFilter }: Props) {

  /* SEARCH STATES */

  const [regionSearch, setRegionSearch] = useState("")
  const [warehouseSearch, setWarehouseSearch] = useState("")
  const [brandSearch, setBrandSearch] = useState("")
  const [groupSearch, setGroupSearch] = useState("")
  const [materialSearch, setMaterialSearch] = useState("")

  /* FORM */

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateRange: undefined,
      region: [],
      warehouse: [],
      Brand: [],
      material_group: [],
      material: [],
    },
  })

  /* WATCH VALUES */

  const regionValue = form.watch("region")
  const materialTypeValue = form.watch("material_group")
  const brandValue = form.watch("Brand")

  /* API DATA */

 const { data: regions = [] } = useRegions(regionSearch)

const { data: warehouses = [] } = useWarehouses(
  regionValue?.join(",") || "",
  warehouseSearch
)

const { data: groups = [] } = useMaterialGroups(groupSearch)

const { data: brands = [] } = useBrands(
  materialTypeValue?.join(",") || "",
  brandSearch
)

const { data: materials = [] } = useMaterials(
  materialTypeValue?.join(",") || "",
  brandValue?.join(",") || "",
  materialSearch
)
  /* RESET DEPENDENT FIELDS */

  useEffect(() => {
    form.setValue("warehouse", [])
  }, [regionValue])

  useEffect(() => {
    form.setValue("Brand", [])
    form.setValue("material", [])
  }, [materialTypeValue])

  useEffect(() => {
    form.setValue("material", [])
  }, [brandValue])

  /* SUBMIT */

function onSubmit(values: FormValues) {

  const filters = {
    fromdate: format(values.dateRange.from, "yyyy-MM-dd"),
    todate: format(values.dateRange.to, "yyyy-MM-dd"),

    region_id: values.region?.join(",") || "",
    warehouse_id: values.warehouse?.join(",") || "",
    brand_id: values.Brand?.join(",") || "",
    material_type_id: values.material_group?.join(",") || "",
    material_id: values.material?.join(",") || "",
  }

  onFilter(filters)

  toast.success("Filters applied")
}

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
                  onSearchChange={(text) => setRegionSearch(text.trim())}
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
                  onSearchChange={(text) => setWarehouseSearch(text.trim())}
                  disabled={!regionValue?.length}
                />

                <FormMessage />

              </FormItem>
            )}
          />

          {/* MATERIAL TYPE */}

          <FormField
            control={form.control}
            name="material_group"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Material Type</FormLabel>

                <MultiSelect
                  options={groups}
                  defaultValue={form.getValues("material_group")}
                  onValueChange={field.onChange}
                  onSearchChange={(text) => setGroupSearch(text.trim())}
                />

                <FormMessage />

              </FormItem>
            )}
          />

          {/* BRAND */}

          <FormField
            control={form.control}
            name="Brand"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Material Brand</FormLabel>

                <MultiSelect
                  options={brands}
                  defaultValue={form.getValues("Brand")}
                  onValueChange={field.onChange}
                  onSearchChange={(text) => setBrandSearch(text.trim())}
                  disabled={!materialTypeValue?.length}
                />

                <FormMessage />

              </FormItem>
            )}
          />

          {/* MATERIAL */}

          <FormField
            control={form.control}
            name="material"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Material</FormLabel>

                <MultiSelect
                  options={materials}
                  defaultValue={form.getValues("material")}
                  onValueChange={field.onChange}
                  onSearchChange={(text) => setMaterialSearch(text.trim())}
                  disabled={!materialTypeValue?.length}
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