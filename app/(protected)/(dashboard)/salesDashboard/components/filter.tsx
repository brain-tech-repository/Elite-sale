"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { AutoComplete } from "@/components/ui/autocomplete"
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

/* =========================
   SCHEMA
========================= */

const formSchema = z.object({
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  region: z.string().min(1, "Region is required"),
  warehouse: z.string().min(1, "Warehouse is required"),
  Brand: z.string().min(1, "Brand is required"),
  material_group: z.string().min(1, "Material group is required"),
  material: z.string().min(1, "Material is required"),
})

type FormValues = z.infer<typeof formSchema>

/* =========================
   COMPONENT
========================= */

export default function MyForm() {

  /* SEARCH STATES */
  const [regionSearch, setRegionSearch] = useState("")
  const [warehouseSearch, setWarehouseSearch] = useState("")
  const [brandSearch, setBrandSearch] = useState("")
  const [groupSearch, setGroupSearch] = useState("")
  const [materialSearch, setMaterialSearch] = useState("")

  /* API DATA */
  const { data: regions = [] } = useRegions(regionSearch)
  const { data: warehouses = [] } = useWarehouses(warehouseSearch)
  const { data: brands = [] } = useBrands(brandSearch)
  const { data: groups = [] } = useMaterialGroups(groupSearch)
  const { data: materials = [] } = useMaterials(materialSearch)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateRange: undefined,
      region: "",
      warehouse: "",
      Brand: "",
      material_group: "",
      material: "",
    },
  })

  function onSubmit(values: FormValues) {
    console.log(values)
    toast.success("Form submitted successfully!")
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-7xl mx-auto py-4 px-2"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">

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

                      <FormControl>
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
                      </FormControl>

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

                <FormControl>
                  <AutoComplete
                    options={regions}
                    value={field.value}
                    onChange={field.onChange}
                    onSearch={setRegionSearch}
                    placeholder="Select Region"
                  />
                </FormControl>

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

                <FormControl>
                  <AutoComplete
                    options={warehouses}
                    value={field.value}
                    onChange={field.onChange}
                    onSearch={setWarehouseSearch}
                    placeholder="select ware"
                  />
                </FormControl>

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

                <FormControl>
                  <AutoComplete
                    options={brands}
                    value={field.value}
                    onChange={field.onChange}
                    onSearch={setBrandSearch}
                    placeholder="Select Brand"
                  />
                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />

          {/* MATERIAL GROUP */}

          <FormField
            control={form.control}
            name="material_group"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Material Group</FormLabel>

                <FormControl>
                  <AutoComplete
                    options={groups}
                    value={field.value}
                    onChange={field.onChange}
                    onSearch={setGroupSearch}
                    placeholder="Select Group"
                  />
                </FormControl>

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

                <FormControl>
                  <AutoComplete
                    options={materials}
                    value={field.value}
                    onChange={field.onChange}
                    onSearch={setMaterialSearch}
                    placeholder="Select Material"
                  />
                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />

        </div>

        {/* BUTTONS */}

        <div className="flex w-full justify-start gap-6 pt-2">

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