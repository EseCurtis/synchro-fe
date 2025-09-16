import { useTMutation } from "@/hooks/api/useTMutation";
import { useTQuery } from "@/hooks/api/useTQuery";
import { useQueryClient } from "@tanstack/react-query";

// Hook for getting admin notifications
export function useAdminNotifications() {
  return useTQuery({
    url: "/admin/notifications/for-admin",
    queryKey: ["admin", "notifications"],
  });
}

// Hook for sending admin notifications
export function useSendAdminNotification() {
  const client = useQueryClient();
  
  return useTMutation({
    url: "/admin/notifications/send",
    method: "post",
    options: {
      onSuccess() {
        client.invalidateQueries(["admin", "notifications"]);
      },
    },
  });
}


