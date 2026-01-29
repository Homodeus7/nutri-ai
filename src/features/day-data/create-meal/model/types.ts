import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";

/**
 * Режимы диалога создания приема пищи
 */
export type CreateMealMode = "search" | "recent" | "create";

/**
 * Состояние диалога создания приема пищи
 */
export interface CreateMealState {
  mode: CreateMealMode;
  isOpen: boolean;
}

/**
 * Данные формы добавления еды
 */
export interface AddFoodFormData {
  name: string;
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
}

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
