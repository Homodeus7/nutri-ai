import { useCallback } from "react";
import type { CreateMealRequest } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useControlledDialog } from "@/shared/ui";
import { useSelectedProducts } from "./selected-products.store";
import { useDialogMode } from "./use-dialog-mode";
import { useAddProducts } from "./use-add-products";

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
  const { clear, getAll } = useSelectedProducts();
  const { mode, createProductName, switchToCreate, switchToSearch, reset } = useDialogMode();

  const dialog = useControlledDialog({
    onOpenChange: (isOpen) => {
      if (!isOpen) {
        reset();
        clear();
      }
    },
  });

  const { addProducts, isPending } = useAddProducts({
    date,
    mealType,
    onSuccess: () => {
      clear();
      dialog.close();
      onSuccess?.();
    },
  });

  const handleAddProducts = useCallback(() => {
    const selectedProducts = getAll();
    addProducts(selectedProducts);
  }, [getAll, addProducts]);

  return {
    ...dialog,
    mode,
    switchToCreate,
    switchToSearch,
    handleAddProducts,
    isPending,
    createProductName,
  };
}
