import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { useTMutation } from "@/hooks/api/useTMutation";
import { useTQuery } from "@/hooks/api/useTQuery";
import { EventStatus } from "@/v2/enums/event.enums";
import { useQueryClient } from "@tanstack/react-query";

// Hook for getting pending events
export function usePendingEvents() {
  return useTQuery({
    url: `/admin/events/for-admin?status=${EventStatus.DRAFT}&page=1&limit=10`,
    queryKey: ["events", "pending-events"],
  });
}

// Hook for getting approved events
export function useApprovedEvents() {
  return useTQuery({
    url: `/admin/events/for-admin?status=${EventStatus.PUBLISHED}&page=1&limit=10`,
    queryKey: ["events", "approved-events"],
  });
}

export function useApprovedEventsByDate({
  fromDate,
  toDate,
}: {
  fromDate: number;
  toDate: number;
}) {
  return useTQuery({
    url: `/admin/events/for-admin-by-date?status=${EventStatus.PUBLISHED}&page=1&limit=20&fromDate=${fromDate}&toDate=${toDate}`,
    queryKey: ["events", "approved-events", String(fromDate), String(toDate)],
  });
}

// Hook for getting declined events with pagination
export function useDeclinedEvents() {
  return usePaginatedQuery({
    url: `/admin/events/for-admin?status=${EventStatus.CANCELLED}`,
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
