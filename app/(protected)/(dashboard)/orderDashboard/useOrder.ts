import api from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import {
  OrderSummaryFilters,
  OrderSummaryResponse,
  OrderTableResponse,
} from "./types";

/* ================= TYPES ================= */

export type SelectOption = {
  value: string;
  label: string;
};

/* ================= HELPERS ================= */

const mapOrderTypes = (data: any): SelectOption[] => {
  if (!data?.data) return [];

  return data.data.map((item: any) => ({
    value: String(item.id),
    label: item.name,
  }));
};

const mapSpecificSelection = (data: any): SelectOption[] => {
  if (!data?.data) return [];

  return data.data.map((item: any) => ({
    value: String(item.id),
    label: item.label,
  }));
};

/* ================= API CALL ================= */

const fetcher = async (url: string) => {
  const { data } = await api.get(url);
  return data;
};

/* ================= HOOKS ================= */

/* ORDER TYPES */
export const useOrderTypes = () =>
  useQuery<SelectOption[]>({
    queryKey: ["order-types"],
    queryFn: async () => {
      const data = await fetcher("/order-analysis/order-types");
      return mapOrderTypes(data);
    },
    staleTime: 1000 * 60 * 5,
  });

/* SPECIFIC SELECTION */
export const useSpecificSelection = (orderType?: string) =>
  useQuery<SelectOption[]>({
    queryKey: ["specific-selection", orderType],

    queryFn: async () => {
      const data = await fetcher(
        `/order-analysis/specific-selection?order_type=${orderType}`,
      );
      return mapSpecificSelection(data);
    },

    enabled: !!orderType, // 🔥 important
  });

//   summary cards

export const useOrderSummary = (filters?: OrderSummaryFilters) =>
  useQuery({
    queryKey: ["order-summary", filters],

    queryFn: async () => {
      const params = new URLSearchParams({
        order_type: filters?.order_type || "",
        from_date: filters?.from_date || "",
        to_date: filters?.to_date || "",
        specific_ids: filters?.specific_selection || "",
      });

      const { data } = await api.get(
        `/order-analysis/summary-cards?${params.toString()}`,
      );

      return data as OrderSummaryResponse;
    },

    enabled: !!filters?.order_type, // 🔥 important
    refetchOnWindowFocus: false,
  });

type TableFilters = OrderSummaryFilters & {
  page?: number;
  per_page?: number;
};

export const useOrderTable = (filters?: TableFilters) =>
  useQuery({
    queryKey: ["order-table", filters],

    queryFn: async () => {
      const params = new URLSearchParams({
        order_type: filters?.order_type || "",
        from_date: filters?.from_date || "",
        to_date: filters?.to_date || "",
        page: String(filters?.page || 1),
        per_page: String(filters?.per_page || 10),
      });

      const { data } = await api.get(
        `/order-analysis/table-data?${params.toString()}`,
      );

      return data as OrderTableResponse;
    },

    // keepPreviousData: true, // 🔥 smooth pagination
    enabled: !!filters?.order_type,
  });
