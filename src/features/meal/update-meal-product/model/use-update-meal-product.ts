import { usePutMealsIdProduct } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useQueryClient } from "@tanstack/react-query";
import type { DayEntry } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";

interface UseUpdateMealProductParams {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function useUpdateMealProduct({
  onSuccess,
  onError,
}: UseUpdateMealProductParams = {}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = usePutMealsIdProduct({
    mutation: {
      onMutate: async ({ id: mealId, data }) => {
        // Cancel outgoing queries for all day data
        await queryClient.cancelQueries({
          predicate: (query) =>
            query.queryKey[0]?.toString().startsWith("/day/") ?? false,
        });

        // Snapshot previous value
        const previousData = queryClient.getQueriesData({
          predicate: (query) =>
            query.queryKey[0]?.toString().startsWith("/day/") ?? false,
        });

        // Optimistically update all day queries
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
                  items: meal.items?.map((item) =>
                    (item.productId ?? item.id) === data.productId
                      ? { ...item, quantity: data.quantity }
                      : item
                  ),
                };
              }),
            };
          }
        );

        return { previousData };
      },
      onSuccess: () => {
        // Invalidate all day queries to refetch fresh data
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0]?.toString().startsWith("/day/") ?? false,
        });
        onSuccess?.();
      },
      onError: (error, _variables, context) => {
        // Rollback on error
        if (context?.previousData) {
          context.previousData.forEach(([queryKey, data]) => {
            queryClient.setQueryData(queryKey, data);
          });
        }
        console.error("Failed to update meal product:", error);
        onError?.(error);
      },
    },
  });

  const updateProduct = (mealId: string, productId: string, quantity: number) => {
    mutate({
      id: mealId,
      data: {
        productId,
        quantity,
      },
    });
  };

  return {
    updateProduct,
    isPending,
  };
}
