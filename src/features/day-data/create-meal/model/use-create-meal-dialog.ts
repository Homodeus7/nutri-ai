import { useState, useCallback } from "react";
import type {
  Product,
  CreateMealRequest,
} from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import type { ProductItemData } from "@/features/product/create-product";
import type { CreateMealState, CreateMealMode } from "./types";
import { transformProductsToMealItems } from "./transform-product";
import { useCreateMeal } from "@/features/day-data";

export interface UseCreateMealDialogOptions {
  date: string;
  mealType: CreateMealRequest["type"];
  onSuccess?: () => void;
}

/**
 * Хук для управления состоянием диалога создания приема пищи
 * Инкапсулирует всю бизнес-логику, переходы между состояниями и вызовы API
 */
export function useCreateMealDialog({
  date,
  mealType,
  onSuccess,
}: UseCreateMealDialogOptions) {
  const [state, setState] = useState<CreateMealState>({
    mode: "search",
    isOpen: false,
  });

  const { createMeal, isPending } = useCreateMeal({
    date,
    onSuccess: () => {
      close();
      onSuccess?.();
    },
  });

  const open = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: true }));
  }, []);

  const close = useCallback(() => {
    setState({ mode: "search", isOpen: false });
  }, []);

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

  const handleProductsSelect = useCallback(
    (products: Product[]) => {
      const items = transformProductsToMealItems(products);
      createMeal({
        type: mealType,
        items,
        source: "manual",
      });
    },
    [createMeal, mealType]
  );

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
    handleProductsSelect,
    handleCreateProduct,
    isPending,
  };
}
