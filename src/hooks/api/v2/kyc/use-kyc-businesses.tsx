import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { useTMutation } from "@/hooks/api/useTMutation";
import { useTQuery } from "@/hooks/api/useTQuery";
import { useQueryClient } from "@tanstack/react-query";

// Hook for getting approved KYC businesses
export function useApprovedKycBusinesses() {
  return useTQuery({
    url: "/user/admin/businesses?status=approved&page=1&limit=10",
    queryKey: ["businesses", "approved-businesses"],
  });
}

// Hook for getting pending KYC businesses with pagination
export function usePendingKycBusinesses() {
  return usePaginatedQuery({
    url: "/user/admin/businesses?status=pending",
    queryKey: ["businesses", "pending-businesses"],
    enabled: true,
  });
}

// Hook for updating KYC business status
export function useUpdateKycBusinessStatus() {
  const client = useQueryClient();
  
  return useTMutation({
    url: "/user/admin/businesses/update-status",
    method: "put",
    options: {
      onSuccess() {
        client.invalidateQueries(["businesses"]);
      },
    },
  });
}
