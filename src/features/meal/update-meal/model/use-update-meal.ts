import { usePutMealsId } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import type {
  UpdateMealItemsRequest,
  DayEntry,
} from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
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
      onMutate: async ({ id: mealId, data }) => {
        await queryClient.cancelQueries({
          predicate: (query) =>
            query.queryKey[0]?.toString().startsWith("/day/") ?? false,
        });

        const previousData = queryClient.getQueriesData({
          predicate: (query) =>
            query.queryKey[0]?.toString().startsWith("/day/") ?? false,
        });

        queryClient.setQueriesData(
          {
            predicate: (query) =>
              query.queryKey[0]?.toString().startsWith("/day/") ?? false,
          },
          (old: DayEntry | undefined) => {
            if (!old?.meals) return old;

            return {
              ...old,
              meals: old.meals.map((meal) => {
                if (meal.id !== mealId) return meal;

                return {
                  ...meal,
                  items: data.items.map((newItem) => {
                    const existing = meal.items?.find(
                      (item) =>
                        (item.productId ?? item.id) ===
                        (newItem.productId ?? newItem.recipeId),
                    );

                    if (existing) {
                      return { ...existing, quantity: newItem.quantity };
                    }

                    return {
                      id: crypto.randomUUID(),
                      mealId,
                      productId: newItem.productId ?? null,
                      recipeId: newItem.recipeId ?? null,
                      name: "",
                      quantity: newItem.quantity,
                      unit: "g",
                      kcal: 0,
                      protein: 0,
                      fat: 0,
                      carbs: 0,
                    };
                  }),
                };
              }),
            };
          },
        );

        return { previousData };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0]?.toString().startsWith("/day/") ?? false,
        });
        onSuccess?.();
      },
      onError: (error, _variables, context) => {
        if (context?.previousData) {
          context.previousData.forEach(([queryKey, data]) => {
            queryClient.setQueryData(queryKey, data);
          });
        }
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
