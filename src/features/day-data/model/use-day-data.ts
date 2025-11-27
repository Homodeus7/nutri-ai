import { useGetDayDate } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { parseDayDate } from "./day-data.schema";
import type { UseQueryOptions } from "@tanstack/react-query";
import type { DayEntry } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";

export interface UseDayDataOptions {
  /**
   * Date in YYYY-MM-DD format
   */
  date: string;

  /**
   * React Query options
   */
  queryOptions?: Partial<UseQueryOptions<DayEntry>>;
}

/**
 * Hook for fetching daily data (meals, calories, etc.)
 * Uses generated API hook from orval with TanStack Query
 * Validates date format before making request
 *
 * @example
 * ```tsx
 * const { data, isLoading, error, refetch } = useDayData({
 *   date: "2025-10-20"
 * });
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <Error error={error} />;
 *
 * return (
 *   <div>
 *     <h1>Day: {data.date}</h1>
 *     <p>Consumed: {data.consumedKcal} / {data.targetKcal} kcal</p>
 *     <MealsList meals={data.meals} />
 *   </div>
 * );
 * ```
 */
export function useDayData({ date, queryOptions }: UseDayDataOptions) {
  // Validate date format
  const validatedDate = parseDayDate(date);

  const query = useGetDayDate(validatedDate, {
    query: queryOptions,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isSuccess: query.isSuccess,
    refetch: query.refetch,
    queryKey: query.queryKey,
  };
}
