import { useDeleteMealsId } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useQueryClient } from "@tanstack/react-query";

interface UseDeleteMealParams {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function useDeleteMeal({
  onSuccess,
  onError,
}: UseDeleteMealParams = {}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useDeleteMealsId({
    mutation: {
      onSuccess: () => {
        // Invalidate day data to refetch meals
        queryClient.invalidateQueries({
          queryKey: ["day"],
        });
        onSuccess?.();
      },
      onError: (error) => {
        console.error("Failed to delete meal:", error);
        onError?.(error);
      },
    },
  });

  const deleteMeal = (mealId: string) => {
    mutate({ id: mealId });
  };

  return {
    deleteMeal,
    isPending,
  };
}
