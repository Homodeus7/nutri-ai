import { useDeleteMealsIdProduct } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useQueryClient } from "@tanstack/react-query";
import type { DayEntry } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";

interface UseRemoveMealProductParams {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function useRemoveMealProduct({
  onSuccess,
  onError,
}: UseRemoveMealProductParams = {}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useDeleteMealsIdProduct({
    mutation: {
      onMutate: async ({ id: mealId, data }) => {
        // Cancel outgoing queries
        await queryClient.cancelQueries({ queryKey: ["day"] });

        // Snapshot previous value
        const previousData = queryClient.getQueriesData({ queryKey: ["day"] });

        queryClient.setQueriesData({ queryKey: ["day"] }, (old: DayEntry | undefined) => {
          if (!old?.meals) return old;

          return {
            ...old,
            meals: old.meals.map((meal) => {
              if (meal.id !== mealId) return meal;

              return {
                ...meal,
                items: meal.items?.filter((item) => item.id !== data.productId),
              };
            }),
          };
        });

        return { previousData };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["day"] });
        onSuccess?.();
      },
      onError: (error, variables, context) => {
        // Rollback on error
        if (context?.previousData) {
          context.previousData.forEach(([queryKey, data]) => {
            queryClient.setQueryData(queryKey, data);
          });
        }
        console.error("Failed to remove meal product:", error);
        onError?.(error);
      },
    },
  });

  const removeProduct = (mealId: string, productId: string) => {
    mutate({
      id: mealId,
      data: {
        productId,
      },
    });
  };

  return {
    removeProduct,
    isPending,
  };
}
