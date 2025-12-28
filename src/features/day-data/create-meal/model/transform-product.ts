import type {
  Product,
  CreateMealRequest,
} from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import type { ProductItemData } from "@/features/product/create-product";

/**
 * Трансформирует массив продуктов в items для CreateMealRequest
 * По умолчанию использует 100g порцию для каждого продукта
 */
export function transformProductsToMealItems(
  products: Product[]
): CreateMealRequest["items"] {
  return products.map((product) => ({
    productId: product.id,
    recipeId: null,
    quantity: 100,
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
