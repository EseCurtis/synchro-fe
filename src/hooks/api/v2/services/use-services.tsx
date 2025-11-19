import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { useTMutation } from "@/hooks/api/useTMutation";
import { useQueryClient } from "@tanstack/react-query";

// Hook for getting pending services with pagination
export function usePendingServices(
  { search }: { search: string } = { search: "" }
) {
  return usePaginatedQuery({
    url: `/admin/services/for-admin?status=pending&search=${search}`,
    queryKey: ["services", "pending-services", search],
    enabled: true,
  });
}

// Hook for updating service status
export function useUpdateServiceStatus() {
  const client = useQueryClient();

  return useTMutation({
    url: "/admin/services/update-status",
    method: "put",
    options: {
      onSuccess() {
        client.invalidateQueries(["services"]);
      },
    },
  });
}
