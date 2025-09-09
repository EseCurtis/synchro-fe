import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { useTMutation } from "@/hooks/api/useTMutation";
import { useTQuery } from "@/hooks/api/useTQuery";
import { useQueryClient } from "@tanstack/react-query";

// Hook for getting pending events
export function usePendingEvents() {
  return useTQuery({
    url: "/admin/events/for-admin?status=pending&page=1&limit=10",
    queryKey: ["events", "pending-events"],
  });
}

// Hook for getting approved events
export function useApprovedEvents() {
  return useTQuery({
    url: "/admin/events/for-admin?status=approved&page=1&limit=1000000000",
    queryKey: ["events", "approved-events"],
  });
}

// Hook for getting declined events with pagination
export function useDeclinedEvents() {
  return usePaginatedQuery({
    url: "/admin/events/for-admin?status=rejected",
    queryKey: ["events", "rejected-events"],
    enabled: true,
  });
}

// Hook for updating event status
export function useUpdateEventStatus() {
  const client = useQueryClient();
  
  return useTMutation({
    url: "/admin/events/update-status",
    method: "put",
    options: {
      onSuccess() {
        client.invalidateQueries(["events"]);
      },
    },
  });
}
