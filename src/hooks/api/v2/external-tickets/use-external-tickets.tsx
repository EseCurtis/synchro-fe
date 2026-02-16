import useHttp from "@/hooks/api/useHttp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePaginatedQuery } from "../../usePaginatedQuery";

export enum ExternalTicketStatus {
  PENDING = "pending",
  ACTIVE = "active",
  USED = "used",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
}

type ExternalTicketsResponse = {
  success: boolean;
  data: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export function useInfiniteExternalTickets(
  limit = 20,
  enabled = true,
  params?: { status?: string; search?: string }
) {
  const status = params?.status;
  const searchText = params?.search;
  
  // Build query params array
  const queryParams = [];
  if (status) queryParams.push(`status=${status}`);
  if (searchText && searchText.trim()) queryParams.push(`search=${encodeURIComponent(searchText)}`);
  
  const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

  return usePaginatedQuery({
    url: `/admin/events/external-tickets${queryString}`,
    queryKey: ["admin", "external-tickets", "infinite", status || "all", searchText || ""],
    enabled,
    usePaginationObject: false, // Server returns { data, page, limit, total, totalPages } directly
  });
}

export function useFulfillExternalTicket() {
  const api = useHttp({});
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ["admin", "external-tickets", "fulfill"],
    mutationFn: async ({
      ticketId,
      externalTicketCode,
      adminNotes,
    }: {
      ticketId: string;
      externalTicketCode: string;
      adminNotes?: string;
    }): Promise<{ success: boolean; data: any }> => {
      const res = await api.put(`admin/events/external-tickets/${ticketId}`, {
        externalTicketCode,
        adminNotes,
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "external-tickets"] });
    },
  });
}

export function useCancelExternalTicket() {
  const api = useHttp({});
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ["admin", "external-tickets", "cancel"],
    mutationFn: async ({
      ticketId,
      reason,
    }: {
      ticketId: string;
      reason: string;
    }): Promise<{ success: boolean; data: any }> => {
      const res = await api.patch(`admin/events/external-tickets/${ticketId}/cancel`, {
        reason,
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "external-tickets"] });
    },
  });
}
