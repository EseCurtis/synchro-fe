import { AppToast } from "@/app/_components/AppToast";
import { useTMutation } from "@/hooks/api/useTMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useResolveReport = (reportId: string) => {
  const client = useQueryClient();
  return useTMutation({
    url: `/admin/reports/${reportId}/resolve`,
    method: "put",
    options: {
      onSuccess() {
        client.invalidateQueries(["reports", "user-report"]);
        toast(<AppToast>Report Resolved</AppToast>, {
          type: "success",
          autoClose: 1000,
        });
      },
    },
  });
};
