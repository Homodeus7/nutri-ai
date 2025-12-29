import type { CreateMealRequest } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import type { ProductItemData } from "@/features/product/create-product";
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
 * Трансформирует ProductItemData из формы создания в CreateMealRequest.items
 * Используется когда пользователь создает новый продукт через диалог
 */
export function transformProductItemDataToMealItem(
  productItemData: ProductItemData
): CreateMealRequest["items"][number] {
  // Предполагаем что продукт будет создан отдельно и у него будет ID
  // Этот кейс требует дополнительной обработки на уровне компонента
  return {
    productId: null, // ID будет установлен после создания продукта
    recipeId: null,
    quantity: 100,
  };
}
