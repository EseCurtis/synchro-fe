import useHttp from "@/hooks/api/useHttp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useChatMessages(
  chatId: string | null | undefined,
  page = 1,
  limit = 50
) {
  const api = useHttp({});

  return useQuery({
    queryKey: ["chat", "messages", chatId, page],
    queryFn: async () => {
      const res = await api.get(
        `/chats/${chatId}/messages?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    enabled: !!chatId,
    refetchInterval: 10000,
  });
}

export function useSendChatMessage() {
  const api = useHttp({});
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ["chat", "send-message"],
    mutationFn: async ({
      chatId,
      message,
    }: {
      chatId: string;
      message: string;
    }) => {
      const res = await api.post(`/chats/${chatId}/messages`, { message });
      return res.data;
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ["chat", "messages", variables.chatId] });
    },
  });
}
