import { useTMutation } from "@/hooks/api/useTMutation";
import { useQueryClient } from "@tanstack/react-query";

// Hook for updating event categories
export function useUpdateEventCategory() {
  const client = useQueryClient();
  
  return useTMutation({
    url: `/admin/categories/event_categories/update`,
    method: "post",
    options: {
      onSuccess: () => {
        client.invalidateQueries(["category", "event-category"]);
      },
    },
  });
}

// Hook for updating business categories
export function useUpdateBusinessCategory() {
  const client = useQueryClient();
  
  return useTMutation({
    url: `/admin/categories/business_categories/update`,
    method: "post",
    options: {
      onSuccess: () => {
        client.invalidateQueries(["category", "business-category"]);
      },
    },
  });
}

