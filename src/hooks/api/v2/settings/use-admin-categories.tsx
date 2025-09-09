import { useTMutation } from "@/hooks/api/useTMutation";
import { useTQuery } from "@/hooks/api/useTQuery";
import { useQueryClient } from "@tanstack/react-query";

// Hook for getting event categories
export function useEventCategories() {
  return useTQuery({
    url: "/admin/categories/event_categories",
    queryKey: ["categories", "event-categories"],
  });
}

// Hook for getting business categories
export function useBusinessCategories() {
  return useTQuery({
    url: "/admin/categories/business_categories",
    queryKey: ["categories", "business-categories"],
  });
}

// Hook for creating event category
export function useCreateEventCategory() {
  const client = useQueryClient();
  
  return useTMutation({
    url: "/admin/categories/create/event_category",
    method: "post",
    options: {
      onSuccess() {
        client.invalidateQueries(["categories", "event-categories"]);
      },
    },
  });
}

// Hook for creating business category
export function useCreateBusinessCategory() {
  const client = useQueryClient();
  
  return useTMutation({
    url: "/admin/categories/create/business_category",
    method: "post",
    options: {
      onSuccess() {
        client.invalidateQueries(["categories", "business-categories"]);
      },
    },
  });
}
