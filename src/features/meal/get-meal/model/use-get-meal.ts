import { useGetMealsId } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";

interface UseGetMealParams {
  mealId: string;
  enabled?: boolean;
}

export function useGetMeal({ mealId, enabled = true }: UseGetMealParams) {
  return useGetMealsId(mealId, {
    query: {
      enabled: enabled && !!mealId,
    },
  });
}
