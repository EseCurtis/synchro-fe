import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { useTMutation } from "@/hooks/api/useTMutation";
import { useQueryClient } from "@tanstack/react-query";

// Hook for getting approved KYC businesses
export function useApprovedKycBusinesses() {
  return usePaginatedQuery({
    url: "/admin/users/businesses?status=approved",
    queryKey: ["businesses", "approved-businesses"],
    enabled: true,
  });
}

// Hook for getting pending KYC businesses with pagination
export function usePendingKycBusinesses() {
  return usePaginatedQuery({
    url: "/admin/users/businesses?status=pending",
    queryKey: ["businesses", "pending-businesses"],
    enabled: true,
  });
}

// Hook for updating KYC business status
export function useUpdateKycBusinessStatus() {
  const client = useQueryClient();
  
  return useTMutation({
    url: "/admin/users/businesses/update-status",
    method: "put",
    options: {
      onSuccess() {
        client.invalidateQueries(["businesses"]);
      },
    },
  });
}

