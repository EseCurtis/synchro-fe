import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { useTMutation } from "@/hooks/api/useTMutation";
import { useQueryClient } from "@tanstack/react-query";

// Hook for getting approved KYC businesses
export function useApprovedKycBusinesses(
  { search }: { search: string } = { search: "" }
) {
  return usePaginatedQuery({
    url: `/admin/users/businesses?status=approved&search=${search}`,
    queryKey: ["businesses", "approved-businesses", search],
    enabled: true,
  });
}

// Hook for getting pending KYC businesses with pagination
export function usePendingKycBusinesses(
  { search }: { search: string } = { search: "" }
) {
  return usePaginatedQuery({
    url: `/admin/users/businesses?status=pending&search=${search}`,
    queryKey: ["businesses", "pending-businesses", search],
    enabled: true,
  });
}


// Hook for getting pending KYC businesses with pagination
export function useDeclinedKycBusiness(
  { search }: { search: string } = { search: "" }
) {
  return usePaginatedQuery({
    url: `/admin/users/businesses?status=rejected&search=${search}`,
    queryKey: ["businesses", "rejected-businesses", search],
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
      onSuccess(data) {
        console.log("data", data);
        client.invalidateQueries(["businesses"]);
      },
    },
  });
}
