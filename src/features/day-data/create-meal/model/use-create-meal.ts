import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  usePostDayDateMeals,
  type CreateMealRequest,
  type Meal,
} from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { getGetDayDateQueryKey } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";

export interface UseCreateMealOptions {
  date: string;
  onSuccess?: (meal: Meal) => void;
  onError?: (error: Error) => void;
}

export function useCreateMeal({
  date,
  onSuccess,
  onError,
}: UseCreateMealOptions) {
  const queryClient = useQueryClient();

  const mutation = usePostDayDateMeals({
    mutation: {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: getGetDayDateQueryKey(date),
        });

        onSuccess?.(data);
      },
      onError: (error) => {
        onError?.(error as Error);
      },
    },
  });

  const createMeal = (mealData: CreateMealRequest) => {
    return mutation.mutate({ date, data: mealData });
  };

  return {
    createMeal,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
}
