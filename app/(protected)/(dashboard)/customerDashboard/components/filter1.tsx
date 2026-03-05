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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

/* =========================
   SCHEMA
========================= */

const formSchema = z.object({
  region: z.string().min(1, "Region is required"),
  warehouse: z.string().min(1, "Warehouse is required"),
  Brand: z.string().min(1, "Brand is required"),
  route: z.string().min(1, "Material group is required"),
  sales_area: z.string().min(1, "Material is required"),
})

type FormValues = z.infer<typeof formSchema>

/* =========================
   COMPONENT
========================= */

export default function MyForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      region: "",
      warehouse: "",
      Brand: "",
      route: "",
      sales_area: "",
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

          {/* ================= Region ================= */}
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Region</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl className="w-full shadow-lg">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="north">North</SelectItem>
                    <SelectItem value="south">South</SelectItem>
                    <SelectItem value="west">West</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ================= Warehouse ================= */}
          <FormField
            control={form.control}
            name="warehouse"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Warehouse</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl className="w-full shadow-lg">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Warehouse" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="wh1">Warehouse 1</SelectItem>
                    <SelectItem value="wh2">Warehouse 2</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex w-full justify-start gap-6 pt-2">
          <Button type="submit"   variant="outline" className="shadow-lg">
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