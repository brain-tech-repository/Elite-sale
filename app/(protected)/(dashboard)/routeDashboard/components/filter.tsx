"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"

import {
  Form,
  FormControl,
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

import { AutoComplete, AutoCompleteOption } from "@/components/ui/autocomplete"


/* =========================
   SCHEMA
========================= */

const formSchema = z.object({
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  region: z.string().min(1, "Region is required"),
  sub_region: z.string().min(1, "Sub Region is required"),
  warehouse: z.string().min(1, "Warehouse is required"),
  routes: z.string().min(1, "Route is required"),
})

type FormValues = z.infer<typeof formSchema>


/* =========================
   OPTIONS
========================= */

const regionOptions: AutoCompleteOption[] = [
  { value: "north", label: "North" },
  { value: "south", label: "South" },
  { value: "west", label: "West" },
]

const subRegionOptions: AutoCompleteOption[] = [
  { value: "sub1", label: "Sub Region 1" },
  { value: "sub2", label: "Sub Region 2" },
]

const warehouseOptions: AutoCompleteOption[] = [
  { value: "wh1", label: "Warehouse 1" },
  { value: "wh2", label: "Warehouse 2" },
]

const routeOptions: AutoCompleteOption[] = [
  { value: "route1", label: "Route 1" },
  { value: "route2", label: "Route 2" },
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
      sub_region: "",
      warehouse: "",
      routes: "",
    },
  })

  function onSubmit(values: FormValues) {
    console.log(values)
    toast.success("Filters applied successfully!")
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-7xl mx-auto py-4 px-2"
      >

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">

          {/* ================= Date Range ================= */}

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
                    options={regionOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select Region"
                    searchPlaceholder="Search region..."
                    width="w-full"
                  />
                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />


          {/* ================= Sub Region ================= */}

          <FormField
            control={form.control}
            name="sub_region"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Sub Region</FormLabel>

                <FormControl>
                  <AutoComplete
                    options={subRegionOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select Sub Region"
                    searchPlaceholder="Search sub region..."
                    width="w-full"
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
                    options={warehouseOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select Warehouse"
                    searchPlaceholder="Search warehouse..."
                    width="w-full"
                  />
                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />


          {/* ================= Routes ================= */}

          <FormField
            control={form.control}
            name="routes"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Routes</FormLabel>

                <FormControl>
                  <AutoComplete
                    options={routeOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select Route"
                    searchPlaceholder="Search route..."
                    width="w-full"
                  />
                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />

        </div>


        {/* ================= Buttons ================= */}

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