"use client"

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
import { AutoComplete, AutoCompleteOption } from "@/components/ui/autocomplete"
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
   DATA
========================= */

const regions: AutoCompleteOption[] = [
  { value: "North", label: "North" },
  { value: "South", label: "South" },
  { value: "West", label: "West" },
  { value: "Northbnhmujh,mjh,m", label: "Northbnhmujh,mjh,m" },
]

const warehouses: AutoCompleteOption[] = [
  { value: "Warehouse 1", label: "Warehouse 1" },
  { value: "Warehouse 2", label: "Warehouse 2" },
]

const brands: AutoCompleteOption[] = [
  { value: "Brand 1", label: "Brand 1" },
  { value: "Brand 2", label: "Brand 2" },

]

const groups: AutoCompleteOption[] = [
  { value: "Group 1", label: "Group 1" },
  { value: "Group 2", label: "Group 2" },
]

const materials: AutoCompleteOption[] = [
  { value: "Material 1", label: "Material 1" },
  { value: "Material 2", label: "Material 2" },
]

/* =========================
   COMPONENT
========================= */

export default function MyForm() {
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
    try {
      console.log(values)
      toast.success("Form submitted successfully!")
    } catch (error) {
      toast.error("Submission failed")
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-7xl mx-auto py-4 px-2"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">

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


          {/* ================= Region ================= */}
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
                    placeholder="Select Region"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* ================= Warehouse ================= */}
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
                    placeholder="Select Warehouse"
                    searchPlaceholder="Search Warehouse..."

                    width="w-full"

                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* ================= Brand ================= */}
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
                    placeholder="Select Brand"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* ================= Material Group ================= */}
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
                    placeholder="Select Mat Group"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* ================= Material ================= */}
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
                    placeholder="Select Material"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

        </div>

        {/* Submit Buttons */}
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