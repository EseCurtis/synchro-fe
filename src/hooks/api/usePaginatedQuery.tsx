import { useAuthContext } from "@/contexts/AuthContext";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  UseQueryOptions,
} from "@tanstack/react-query"; // Fixed import path
import { useHandleError } from "./useHandleError";
import useHttp, { Method } from "./useHttp";

export type Args = {
  queryKey: string[];
  url: string;
  options?: UseQueryOptions<any, any, any, string[]>;
  enabled?: boolean;
  method?: Method;
  requestBody?: any;
  keepPreviousData?: boolean;
};

export function usePaginatedQuery<T>({
  queryKey,
  enabled = true,
  url,
  options,
  method = "get",
  requestBody,
  keepPreviousData = true,
}: Args): UseInfiniteQueryResult<T, unknown> {
  const { token, signout } = useAuthContext();
  const api = useHttp({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  const { handleError } = useHandleError();

  const checkIfUrlHasQueryParams = url.includes("?");
  const queryParam = checkIfUrlHasQueryParams ? "&" : "?";

  // @ts-ignore
  return useInfiniteQuery<T>( // Specify the generic type parameter T for useInfiniteQuery
    queryKey,
    async ({ pageParam = 1 }) => {
      const res = await api[method](
        `${url}${queryParam}page=${pageParam}&limit=10`,
        requestBody
      );
      return res.data;
    },
    // @ts-ignore
    {
      enabled,
      getNextPageParam: (lastPage: any) => {
        if (lastPage.data.totalPages > lastPage.data.page) {
          return lastPage.data.page + 1;
        } else {
          return undefined;
        }
      }, // Simplified getNextPageParam
      onError: (e: any) => {
        console.error(e.response.data); // Use console.error for errors
        handleError(e);
      },
      keepPreviousData,
      ...options,
    }
  );
}
