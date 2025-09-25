import { useCallback, useState } from "react";
import { usePaginatedQuery } from "./usePaginatedQuery";

export type SearchParams = {
  search?: string;
  [key: string]: any;
};

export function useSearchQuery<T>({
  baseUrl,
  queryKey,
  enabled = true,
  initialSearchParams = {},
}: {
  baseUrl: string;
  queryKey: string[];
  enabled?: boolean;
  initialSearchParams?: SearchParams;
}) {
  const [searchParams, setSearchParams] = useState<SearchParams>(initialSearchParams);

  // Build URL with search parameters
  const buildUrl = useCallback(() => {
    const params = new URLSearchParams();
    
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }, [baseUrl, searchParams]);

  const query = usePaginatedQuery<T>({
    url: buildUrl(),
    queryKey: [...queryKey, JSON.stringify(searchParams)],
    enabled,
  });

  const updateSearch = useCallback((newParams: Partial<SearchParams>) => {
    setSearchParams(prev => ({
      ...prev,
      ...newParams,
    }));
  }, []);

  const clearSearch = useCallback(() => {
    setSearchParams(initialSearchParams);
  }, [initialSearchParams]);

  return {
    ...query,
    searchParams,
    updateSearch,
    clearSearch,
  };
}


