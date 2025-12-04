import useHttp from "@/hooks/api/useHttp";
import { usePaginatedQuery } from "@/hooks/api/usePaginatedQuery";
import { Faq } from "@/v2/types/faq.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type AdminFaqFilters = {
  search?: string;
  category?: string;
  isPublished?: boolean;
  limit?: number;
};

const buildFaqUrl = (filters: AdminFaqFilters): string => {
  const params = new URLSearchParams();

  if (filters.search) {
    params.append("search", filters.search);
  }

  if (filters.category) {
    params.append("category", filters.category);
  }

  if (filters.isPublished !== undefined) {
    params.append("isPublished", String(filters.isPublished));
  }

  const base = "/admin/faqs";
  const query = params.toString();
  return query ? `${base}?${query}` : base;
};

export function useAdminFaqs(filters: AdminFaqFilters = {}) {
  const url = buildFaqUrl(filters);
  const queryKey = [
    "admin",
    "faqs",
    filters.search ?? "",
    filters.category ?? "all",
    filters.isPublished === undefined
      ? "all"
      : filters.isPublished
      ? "published"
      : "draft",
  ];

  return usePaginatedQuery({
    url,
    queryKey,
    enabled: true,
  //  usePaginationObject: true,
    keepPreviousData: true,
  });
}

export function useCreateFaq() {
  const api = useHttp({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<Faq>) => {
      const res = await api.post("/admin/faqs", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "faqs"] });
    },
  });
}

export function useUpdateFaq() {
  const api = useHttp({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      faqId,
      payload,
    }: {
      faqId: string;
      payload: Partial<Faq>;
    }) => {
      const res = await api.put(`/admin/faqs/${faqId}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "faqs"] });
    },
  });
}

export function useDeleteFaq() {
  const api = useHttp({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (faqId: string) => {
      const res = await api.delete(`/admin/faqs/${faqId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "faqs"] });
    },
  });
}

