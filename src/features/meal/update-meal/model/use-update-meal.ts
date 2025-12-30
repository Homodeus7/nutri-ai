import { usePutMealsId } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import type { UpdateMealItemsRequest } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useQueryClient } from "@tanstack/react-query";

interface UseUpdateMealParams {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function useUpdateMeal({
  onSuccess,
  onError,
}: UseUpdateMealParams = {}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = usePutMealsId({
    mutation: {
      onSuccess: () => {
        // Invalidate both meal and day queries
        queryClient.invalidateQueries({
          queryKey: ["/meals"],
        });
        queryClient.invalidateQueries({
          queryKey: ["day"],
        });
        onSuccess?.();
      },
      onError: (error) => {
        console.error("Failed to update meal:", error);
        onError?.(error);
      },
    },
  });

  const updateMealItems = (mealId: string, items: UpdateMealItemsRequest["items"]) => {
    mutate({
      id: mealId,
      data: { items },
    });
  };

  return {
    updateMeal: mutate,
    updateMealItems,
    isPending,
  };
}
