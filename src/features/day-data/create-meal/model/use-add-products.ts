import { useCallback, useMemo } from "react";
import type { CreateMealRequest } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useCreateMeal, useDayData } from "@/features/day-data";
import { useUpdateMeal } from "@/features/meal/update-meal";
import { transformProductsToMealItems, normalizeFoodItemsForUpdate } from "./transform-product";
import type { SelectedProduct } from "./selected-products.store";

interface UseAddProductsOptions {
  date: string;
  mealType: CreateMealRequest["type"];
  onSuccess?: () => void;
}

export function useAddProducts({ date, mealType, onSuccess }: UseAddProductsOptions) {
  const { data: dayData } = useDayData({ date });

  const existingMeal = useMemo(() => {
    return dayData?.meals?.find((meal) => meal.type === mealType);
  }, [dayData?.meals, mealType]);

  const { createMeal, isPending: isCreating } = useCreateMeal({
    date,
    onSuccess,
  });

  const { updateMeal, isPending: isUpdating } = useUpdateMeal({
    onSuccess,
  });

  const isPending = isCreating || isUpdating;

  const addProducts = useCallback(
    (selectedProducts: SelectedProduct[]) => {
      if (selectedProducts.length === 0) return;

      const newItems = transformProductsToMealItems(selectedProducts);

      if (existingMeal) {
        const normalizedExistingItems = normalizeFoodItemsForUpdate(existingMeal.items);
        const mergedItems = [...normalizedExistingItems, ...newItems];

        updateMeal({
          id: existingMeal.id,
          data: { items: mergedItems },
        });
      } else {
        createMeal({
          type: mealType,
          items: newItems,
          source: "manual",
        });
      }
    },
    [existingMeal, createMeal, updateMeal, mealType]
  );

  return { addProducts, isPending, existingMeal };
}
