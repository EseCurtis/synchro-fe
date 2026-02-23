import useHttp from "@/hooks/api/useHttp";
import { AdminVenueResponse, VenueStatus } from "@/v2/types/venue.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePaginatedQuery } from "../../usePaginatedQuery";

type AdminVenueListParams = {
  status?: VenueStatus;
  limit?: number;
};

type UpdateVenueVariables = {
  venueId: string;
  payload: Partial<Record<string, unknown>>;
};

type BulkDeletePayload = {
  venueIds: string[];
};

type SynchroParams = {
  status?: VenueStatus;
  limit?: number;
};

export function useAdminVenues(params: AdminVenueListParams) {
  const query = new URLSearchParams({});

  if (params.status) {
    query.set("status", params.status);
  }

  return usePaginatedQuery<AdminVenueResponse>({
    queryKey: ["admin", "venues", params.status ?? "all"],
    url: `/admin/venues?${params.status ? `status=${params.status}` : ""}`,
    enabled: true,
  });
}

export function useSynchroVenues(params: SynchroParams = {}) {
  const query = new URLSearchParams({});

  if (params.status) {
    query.set("status", params.status);
  }

  return usePaginatedQuery<AdminVenueResponse>({
    queryKey: ["admin", "venues", "synchro", params.status ?? "all"],
    url: `/admin/venues?type=synchro-ai&${
      params.status ? `status=${params.status}` : ""
    }`,
    enabled: true,
  });
}

export function useUpdateAdminVenue() {
  const api = useHttp({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ venueId, payload }: UpdateVenueVariables) => {
      const res = await api.put(`/admin/venues/${venueId}/update`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "venues"] });
    },
  });
}

export function useDeleteAdminVenue() {
  const api = useHttp({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (venueId: string) => {
      const res = await api.delete(`/admin/venues/${venueId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "venues"] });
    },
  });
}

export function useBulkDeleteAdminVenues() {
  const api = useHttp({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: BulkDeletePayload) => {
      const res = await api.post("/admin/venues/bulk-delete", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "venues"] });
    },
  });
}
