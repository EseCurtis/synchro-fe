import { useTQuery } from "./useTQuery";

/**
 * Custom hook for fetching user activity analytics data
 * 
 * @param timeframe - Time period for analytics data ('day' | 'week' | 'month' | 'year')
 * @returns Query result with user activity data
 */
export const useUserActivity = (timeframe: 'day' | 'week' | 'month' | 'year' = 'month') => {
  return useTQuery({
    url: `/admin/reports/user-activity?timeframe=${timeframe}`,
    queryKey: ["user-activity", timeframe],
   // staleTime: 5 * 60 * 1000, // 5 minutes
   // refetchOnWindowFocus: false,
  });
};

export default useUserActivity;



