import { useGetDayDate } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { parseDayDate } from "./day-data.schema";
import type { UseQueryOptions } from "@tanstack/react-query";
import type { DayEntry } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";

export interface UseDayDataOptions {
  date: string;
  queryOptions?: Partial<UseQueryOptions<DayEntry>>;
}

export function useDayData({ date, queryOptions }: UseDayDataOptions) {
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
