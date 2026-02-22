import useHttp from "@/hooks/api/useHttp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePaginatedQuery } from "../../usePaginatedQuery";

export enum ExternalBookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  NO_SHOW = "no_show",
}

export function useInfiniteExternalBookings(
  limit = 20,
  enabled = true,
  params?: { status?: string; search?: string }
) {
  const status = params?.status;
  const searchText = params?.search;

  const queryParams = [];
  if (status) queryParams.push(`status=${status}`);
  if (searchText && searchText.trim())
    queryParams.push(`search=${encodeURIComponent(searchText)}`);

  const queryString =
    queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

  return usePaginatedQuery({
    url: `/admin/venues/external-bookings${queryString}`,
    queryKey: [
      "admin",
      "external-bookings",
      "infinite",
      status || "all",
      searchText || "",
    ],
    enabled,
    usePaginationObject: false,
  });
}

export function useFulfillExternalBooking() {
  const api = useHttp({});
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ["admin", "external-bookings", "fulfill"],
    mutationFn: async ({
      bookingId,
      externalBookingCode,
      adminNotes,
    }: {
      bookingId: string;
      externalBookingCode: string;
      adminNotes?: string;
    }): Promise<{ success: boolean; data: any }> => {
      const res = await api.put(
        `admin/venues/external-bookings/${bookingId}/fulfill`,
        { externalBookingCode, adminNotes }
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "external-bookings"] });
    },
  });
}

export function useUpdateExternalBookingStatus() {
  const api = useHttp({});
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ["admin", "external-bookings", "update-status"],
    mutationFn: async ({
      bookingId,
      status,
      adminNotes,
      externalBookingCode,
    }: {
      bookingId: string;
      status: string;
      adminNotes?: string;
      externalBookingCode?: string;
    }): Promise<{ success: boolean; data: any }> => {
      const res = await api.put(
        `admin/venues/external-bookings/${bookingId}/status`,
        { status, adminNotes, externalBookingCode }
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "external-bookings"] });
    },
  });
}
