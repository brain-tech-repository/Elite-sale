"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DataTableSubHeader from "@/components/table-data/data-table-sub-header";
import DataTableHeader from "@/components/table-data/table-header";

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

  routes: z.string().min(1, "Route is required"),
});

type FormValues = z.infer<typeof formSchema>;

/* =========================
   COMPONENT
========================= */

export default function MyForm1() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateRange: {
        from: undefined,
        to: undefined,
      },
      routes: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    toast.success("Filters applied successfully!");
  }

  return (
    <>
      <Form {...form}>
        {/* <DataTableHeader title="Route Performance" /> */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-1 max-w-7xl mx-auto py-1 px-2"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 lg:px-4">
            {/* ================= Date Range ================= */}

            {/* <FormField
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
                            "pl-3 text-left font-normal shadow-sm w-full",
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
          /> */}

            {/* ================= Routes ================= */}

            <FormField
              control={form.control}
              name="routes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Routes</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="shadow-sm w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Route" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="route1">Route 1</SelectItem>
                      <SelectItem value="route2">Route 2</SelectItem>
                      <SelectItem value="route3">Route 3</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-6 pt-6">
              <Button type="submit" variant="outline" className="shadow-sm">
                Filter
              </Button>

              <Button
                type="button"
                variant="outline"
                className="shadow-sm"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
            </div>
          </div>

          {/* ================= Buttons ================= */}
        </form>
      </Form>
    </>
  );
}
