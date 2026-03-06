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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Calendar } from "@/components/ui/calendar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



/* =========================
   SCHEMA
========================= */

const formSchema = z.object({
  dateRange: z.object({
    from: z.date({
      message: "Start date is required",
    }),
    to: z.date({
      message: "End date is required",
    }),
  }),

  order_type: z.string().min(1, "Order type is required"),

  distributor: z.string().min(1, "Distributor is required"),
})

type FormValues = z.infer<typeof formSchema>



/* =========================
   COMPONENT
========================= */

export default function MyForm() {

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateRange: undefined,
      order_type: "",
      distributor: "",
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
        className="space-y-6 max-w-5xl mx-auto py-4 px-2"
      >

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

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
                            "pl-3 text-left font-normal shadow-lg",
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



          {/* ================= Order Type ================= */}

          <FormField
            control={form.control}
            name="order_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Type</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="shadow-lg w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Order Type" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                  </SelectContent>

                </Select>

                <FormMessage />
              </FormItem>
            )}
          />



          {/* ================= Distributor ================= */}

          <FormField
            control={form.control}
            name="distributor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distributor</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="shadow-lg w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Distributor" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="all">All Distributor</SelectItem>
                    <SelectItem value="dist1">Distributor 1</SelectItem>
                    <SelectItem value="dist2">Distributor 2</SelectItem>
                  </SelectContent>

                </Select>

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