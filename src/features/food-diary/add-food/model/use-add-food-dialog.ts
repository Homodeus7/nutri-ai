import { useState, useCallback } from "react";
import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import type { ProductItemData } from "@/features/product/create-product";
import type { AddFoodState, AddFoodFormData, AddFoodMode } from "./types";
import {
  transformProducts,
  transformProductItemData,
} from "./transform-product";

export interface UseAddFoodDialogOptions {
  onAddFood: (formData: AddFoodFormData) => void;
}

/**
 * Хук для управления состоянием диалога добавления еды
 * Инкапсулирует всю бизнес-логику и переходы между состояниями
 */
export function useAddFoodDialog({ onAddFood }: UseAddFoodDialogOptions) {
  const [state, setState] = useState<AddFoodState>({
    mode: "search",
    isOpen: false,
  });

  const open = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: true }));
  }, []);

  const close = useCallback(() => {
    setState({ mode: "search", isOpen: false });
  }, []);

  const switchMode = useCallback((mode: AddFoodMode) => {
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
      const formDataList = transformProducts(products);
      formDataList.forEach(onAddFood);
      close();
    },
    [onAddFood, close]
  );

  const handleCreateProduct = useCallback(
    (productItemData: ProductItemData) => {
      const formData = transformProductItemData(productItemData);
      onAddFood(formData);
      close();
    },
    [onAddFood, close]
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
  };
}
