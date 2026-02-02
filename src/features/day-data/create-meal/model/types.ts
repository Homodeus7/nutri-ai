import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";

/**
 * Режимы диалога создания приема пищи
 */
export type CreateMealMode = "search" | "create";

/**
 * Пропсы для диалога создания приема пищи
 */
export interface CreateMealDialogProps {
  date: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack" | "other";
  mealName: string;
}

/**
 * Пропсы для обработчиков выбора продуктов
 */
export interface ProductSelectionHandlers {
  onProductsSelect: (products: Product[]) => void;
  onSwitchToCreate: (initialName?: string) => void;
}
