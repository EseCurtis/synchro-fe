import { useTMutation } from "@/hooks/api/useTMutation";
import { useQueryClient } from "@tanstack/react-query";

// Hook for suspending users
export function useSuspendUser() {
  const client = useQueryClient();
  
  return useTMutation({
    url: `/admin/users/suspend`,
    method: "post",
    options: {
      onSuccess() {
        client.invalidateQueries(["users"]);
        //window.location.reload();
      },
    },
  });
}
