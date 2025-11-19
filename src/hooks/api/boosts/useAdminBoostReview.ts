import useHttp from "@/hooks/api/useHttp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePaginatedQuery } from "../usePaginatedQuery";

export enum BoostStatus {
  DRAFT = "draft",
  PENDING_REVIEW = "pending_review", // Awaiting admin review
  IN_REVIEW = "in_review", // Currently under review
  REJECTED = "rejected", // Failed policy review
  PENDING_PAYMENT = "pending_payment",
  ACTIVE = "active",
  PAUSED = "paused",
  EXPIRED = "expired",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  FAILED = "failed", // Technical failure
}


type PendingResponse = {
  success: boolean;
  data: any[];
  pagination?: { page: number; limit: number; total: number; totalPages: number };
};

export function usePendingBoostReviews(page: number = 1, limit: number = 20, enabled: boolean = true) {
  const api = useHttp({});
  return useQuery({
    queryKey: ["admin", "boosts", "pending", page, limit],
    enabled,
    queryFn: async (): Promise<PendingResponse> => {
      const res = await api.get(`admin/boosts?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });
}

export function useInfinitePendingBoostReviews(limit: number = 20, enabled: boolean = true, params?: { status?: BoostStatus; search?: string }) {
  // const api = useHttp({});
  // return useInfiniteQuery({
  //   queryKey: ["admin", "boosts", "pending", "infinite", limit, params?.status || BoostStatus.PENDING_REVIEW, params?.search || ""],
  //   enabled,
  //   initialPageParam: 1,
  //   getNextPageParam: (lastPage: PendingResponse, allPages) => {
  //     const next = (lastPage?.pagination?.page || 1) + 1;
  //     const totalPages = lastPage?.pagination?.totalPages || 1;
  //     return next <= totalPages ? next : undefined;
  //   },
  //   queryFn: async ({ pageParam }): Promise<PendingResponse> => {
  //     const page = typeof pageParam === "number" ? pageParam : 1;
  //     const status = params?.status || BoostStatus.PENDING_REVIEW;
  //     const search = params?.search ? `&search=${encodeURIComponent(params.search)}` : "";
  //     const res = await api.get(`admin/boosts?page=${page}&limit=${limit}&status=${status}${search}`);
  //     return res.data;
  //   },
  // });

  const status = params?.status || BoostStatus.PENDING_REVIEW;
  return usePaginatedQuery({
    url: `/admin/boosts?status=${status}`,
    queryKey: ["admins", "boostsc", "pending", "infinite", params?.status || BoostStatus.PENDING_REVIEW, params?.search || ""],
    enabled: true,
    usePaginationObject: true
  });
}

export function useApproveBoost() {
  const api = useHttp({});
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["admin", "boosts", "approve"],
    mutationFn: async (boostId: string): Promise<{ success: boolean; data: any }> => {
      const res = await api.patch(`admin/boosts/${boostId}/status`, {
        status: BoostStatus.ACTIVE
      });
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
    mutationKey: ["admin", "boosts", "approve"],
    mutationFn: async (boostId: string): Promise<{ success: boolean; data: any }> => {
      const res = await api.patch(`admin/boosts/${boostId}/status`, {
        status: BoostStatus.REJECTED
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "boosts", "pending"] });
    },
  });
}

export function useRefundBoost() {
  const api = useHttp({});
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["admin", "boosts", "reject"],
    mutationFn: async ({
      boostId,
      reason,
      amount,
    }: {
      boostId: string;
      reason: string;
      amount?: number;
    }): Promise<{ success: boolean; data: any }> => {
      const res = await api.post(`admin/boosts/${boostId}/refund`, { reason, amount });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "boosts", "pending"] });
    },
  });
}


