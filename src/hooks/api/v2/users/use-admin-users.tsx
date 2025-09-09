import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";

// Hook for getting active users
export function useActiveUsers() {
  return usePaginatedQuery({
    url: "/admin/users?suspended=false",
    queryKey: ["users", "active-users"],
    enabled: true,
  });
}

// Hook for getting suspended users
export function useSuspendedUsers() {
  return usePaginatedQuery({
    url: "/admin/users?suspended=true",
    queryKey: ["users", "suspended-users"],
    enabled: true,
  });
}
