import { useState, useCallback, useMemo } from "react";
import type { CreateMealRequest } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import type { ProductItemData } from "@/features/product/create-product";
import { useControlledDialog } from "@/shared/ui";
import type { CreateMealMode } from "./types";
import { transformProductsToMealItems } from "./transform-product";
import { useCreateMeal, useDayData } from "@/features/day-data";
import { useSelectedProducts } from "./selected-products.store";

export interface UseCreateMealDialogOptions {
  date: string;
  mealType: CreateMealRequest["type"];
  onSuccess?: () => void;
}

export function useCreateMealDialog({
  date,
  mealType,
  onSuccess,
}: UseCreateMealDialogOptions) {
  const [mode, setMode] = useState<CreateMealMode>("search");

  const { data: dayData } = useDayData({ date });
  const { clear, getAll } = useSelectedProducts();

  const existingMeal = useMemo(() => {
    return dayData?.meals?.find((meal) => meal.type === mealType);
  }, [dayData?.meals, mealType]);

  const { createMeal, isPending } = useCreateMeal({
    date,
    onSuccess: () => {
      clear();
      dialog.close();
      onSuccess?.();
    },
  });

  const dialog = useControlledDialog({
    onOpenChange: (isOpen) => {
      if (!isOpen) {
        setMode("search");
        clear();
      }
    },
  });

  const switchMode = useCallback((newMode: CreateMealMode) => {
    setMode(newMode);
  }, []);

  const switchToCreate = useCallback(() => {
    switchMode("create");
  }, [switchMode]);

  const switchToSearch = useCallback(() => {
    switchMode("search");
  }, [switchMode]);

  const switchToRecent = useCallback(() => {
    switchMode("recent");
  }, [switchMode]);

  const handleAddProducts = useCallback(() => {
    const selectedProducts = getAll();
    if (selectedProducts.length === 0) return;

    const items = transformProductsToMealItems(selectedProducts);

    if (existingMeal) {
      console.warn("Update meal not implemented yet. Need PATCH/PUT endpoint");
      console.log("Existing meal:", existingMeal);
      console.log("New items to add:", items);
      clear();
      dialog.close();
    } else {
      createMeal({
        type: mealType,
        items,
        source: "manual",
      });
    }
  }, [
    getAll,
    existingMeal,
    createMeal,
    mealType,
    clear,
    dialog,
  ]);

  const handleCreateProduct = useCallback(
    (productItemData: ProductItemData) => {
      console.warn("Create product not implemented yet", productItemData);
      dialog.close();
    },
    [dialog]
  );

  return {
    state: {
      mode,
      isOpen: dialog.isOpen,
    },
    ...dialog,
    switchToCreate,
    switchToSearch,
    switchToRecent,
    handleAddProducts,
    handleCreateProduct,
    isPending,
    existingMeal,
  };
}
