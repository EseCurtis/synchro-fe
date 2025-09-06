import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { useTMutation } from "@/hooks/api/useTMutation";
import { useQueryClient } from "@tanstack/react-query";

// Hook for getting pending services with pagination
export function usePendingServices() {
  return usePaginatedQuery({
    url: "/service/for-admin?status=pending",
    queryKey: ["services", "pending-services"],
    enabled: true,
  });
}

// Hook for updating service status
export function useUpdateServiceStatus() {
  const client = useQueryClient();
  
  return useTMutation({
    url: "/service/admin/update-status",
    method: "put",
    options: {
      onSuccess() {
        client.invalidateQueries(["services"]);
      },
    },
  });
}
