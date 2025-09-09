import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { useTMutation } from "@/hooks/api/useTMutation";
import { useQueryClient } from "@tanstack/react-query";

// Hook for getting pending venues with pagination
export function usePendingVenues() {
  return usePaginatedQuery({
    url: "/admin/venues/for-admin?status=pending",
    queryKey: ["venues", "pending-venues"],
    enabled: true,
  });
}

// Hook for updating venue status
export function useUpdateVenueStatus() {
  const client = useQueryClient();
  
  return useTMutation({
    url: "/admin/venues/update-status",
    method: "put",
    options: {
      onSuccess() {
        client.invalidateQueries(["venues"]);
      },
    },
  });
}

