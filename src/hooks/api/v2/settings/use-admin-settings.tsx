import { useTMutation } from "@/hooks/api/useTMutation";
import { useTQuery } from "@/hooks/api/useTQuery";
import { useQueryClient } from "@tanstack/react-query";

// Hook for getting admin settings
export function useAdminSettings() {
  return useTQuery({
    url: "/admin/settings",
    queryKey: ["admin", "settings"],
  });
}

// Hook for updating admin settings
export function useUpdateAdminSettings() {
  const client = useQueryClient();
  
  return useTMutation({
    url: "/admin/settings",
    method: "put",
    options: {
      onSuccess() {
        client.invalidateQueries(["admin", "settings"]);
      },
    },
  });
}

// Hook for getting fee configuration
export function useFeeConfiguration() {
  return useTQuery({
    url: "/admin/settings/fees",
    queryKey: ["admin", "fee-configuration"],
  });
}

// Hook for updating fee configuration
export function useUpdateFeeConfiguration() {
  const client = useQueryClient();
  
  return useTMutation({
    url: "/admin/settings/fees",
    method: "put",
    options: {
      onSuccess() {
        client.invalidateQueries(["admin", "fee-configuration"]);
      },
    },
  });
}
