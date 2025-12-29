import { useState, useCallback, useMemo } from "react";
import type { CreateMealRequest } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import type { ProductItemData } from "@/features/product/create-product";
import type { CreateMealState, CreateMealMode } from "./types";
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
  const [state, setState] = useState<CreateMealState>({
    mode: "search",
    isOpen: false,
  });

  const { data: dayData } = useDayData({ date });
  const { clear, getAll } = useSelectedProducts();

  // Проверяем, существует ли уже meal с данным типом
  const existingMeal = useMemo(() => {
    return dayData?.meals?.find((meal) => meal.type === mealType);
  }, [dayData?.meals, mealType]);

  const { createMeal, isPending } = useCreateMeal({
    date,
    onSuccess: () => {
      clear();
      close();
      onSuccess?.();
    },
  });

  const open = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: true }));
  }, []);

  const close = useCallback(() => {
    setState({ mode: "search", isOpen: false });
    clear();
  }, [clear]);

  const switchMode = useCallback((mode: CreateMealMode) => {
    setState((prev) => ({ ...prev, mode }));
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
      // TODO: Implement update meal API call when PATCH/PUT endpoint is available
      console.warn("Update meal not implemented yet. Need PATCH/PUT endpoint");
      console.log("Existing meal:", existingMeal);
      console.log("New items to add:", items);
      clear();
      close();
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
    close,
  ]);

  const handleCreateProduct = useCallback(
    (productItemData: ProductItemData) => {
      // TODO: Сначала нужно создать продукт через API, затем добавить его в прием пищи
      // Это потребует интеграции с useCreateProduct или аналогичным хуком
      console.warn("Create product not implemented yet", productItemData);
      close();
    },
    [close]
  );

  return {
    state,
    open,
    close,
    switchToCreate,
    switchToSearch,
    switchToRecent,
    handleAddProducts,
    handleCreateProduct,
    isPending,
    existingMeal,
  };
}
