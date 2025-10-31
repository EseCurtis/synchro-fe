import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useHttp from "@/hooks/api/useHttp";
import { Boost, BoostReviewRejectPayload } from "@/types/boost";

type PendingResponse = {
  success: boolean;
  data: Boost[];
  pagination?: { page: number; limit: number; total: number; totalPages: number };
};

export function usePendingBoostReviews(page: number = 1, limit: number = 20, enabled: boolean = true) {
  const api = useHttp({});
  return useQuery({
    queryKey: ["admin", "boosts", "pending", page, limit],
    enabled,
    queryFn: async (): Promise<PendingResponse> => {
      const res = await api.get(`/api/v1/boosts/admin/pending-reviews?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });
}

export function useApproveBoost() {
  const api = useHttp({});
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["admin", "boosts", "approve"],
    mutationFn: async (boostId: string): Promise<{ success: boolean; data: Boost }> => {
      const res = await api.post(`/api/v1/boosts/${boostId}/approve`);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "boosts", "pending"] });
    },
  });
}

export function useRejectBoost() {
  const api = useHttp({});
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["admin", "boosts", "reject"],
    mutationFn: async ({
      boostId,
      payload,
    }: {
      boostId: string;
      payload: BoostReviewRejectPayload;
    }): Promise<{ success: boolean; data: Boost }> => {
      const res = await api.post(`/api/v1/boosts/${boostId}/reject`, payload);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "boosts", "pending"] });
    },
  });
}


