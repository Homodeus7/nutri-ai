import type { CreateMealRequest, UpdateMealItemsRequest, FoodItem } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import type { SelectedProduct } from "./selected-products.store";

/**
 * Трансформирует массив выбранных продуктов в items для CreateMealRequest
 */
export function transformProductsToMealItems(
  selectedProducts: SelectedProduct[]
): CreateMealRequest["items"] {
  return selectedProducts.map(({ product, quantity }) => ({
    productId: product.id,
    recipeId: null,
    quantity: quantity ?? 0,
  }));
}

/**
 * Нормализует FoodItem из ответа сервера в формат для UpdateMealItemsRequest
 * Оставляет только необходимые поля: productId, recipeId, quantity
 */
export function normalizeFoodItemsForUpdate(
  items: FoodItem[] | undefined
): UpdateMealItemsRequest["items"] {
  if (!items) return [];

  return items.map((item) => ({
    productId: item.productId ?? null,
    recipeId: item.recipeId ?? null,
    quantity: item.quantity,
  }));
}

