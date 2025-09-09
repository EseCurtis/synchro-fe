import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";

// Hook for getting user reports
export function useUserReports() {
  return usePaginatedQuery({
    url: "/admin/reports/for-admin?type=user",
    queryKey: ["reports", "user-reports"],
    enabled: true,
  });
}

// Hook for getting feed reports
export function useFeedReports() {
  return usePaginatedQuery({
    url: "/admin/reports/for-admin?type=feed",
    queryKey: ["reports", "feed-reports"],
    enabled: true,
  });
}

// Hook for getting event reports
export function useEventReports() {
  return usePaginatedQuery({
    url: "/admin/reports/for-admin?type=event",
    queryKey: ["reports", "event-reports"],
    enabled: true,
  });
}

// Hook for getting audit trails
export function useAuditTrails() {
  return usePaginatedQuery({
    url: "/admin/reports/audit-trails",
    queryKey: ["reports", "audit-trails"],
    enabled: true,
  });
}
