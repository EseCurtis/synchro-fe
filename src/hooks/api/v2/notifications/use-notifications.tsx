import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";

// Hook for getting user notifications with pagination
export function useUserNotifications() {
  return usePaginatedQuery({
    url: `/notification`,
    queryKey: ["user", "notification"],
    enabled: true,
  });
}
