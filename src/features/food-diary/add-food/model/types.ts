import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";

/**
 * Режимы диалога добавления еды
 */
export type AddFoodMode = "search" | "recent" | "create";

/**
 * Состояние диалога добавления еды
 */
export interface AddFoodState {
  mode: AddFoodMode;
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
 * Пропсы для диалога добавления еды
 */
export interface AddFoodDialogProps {
  mealName: string;
  onAddFood: (formData: AddFoodFormData) => void;
}

/**
 * Пропсы для обработчиков выбора продуктов
 */
export interface ProductSelectionHandlers {
  onProductsSelect: (products: Product[]) => void;
  onSwitchToCreate: () => void;
}
