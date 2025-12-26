import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import type { ProductItemData } from "@/features/product/create-product";
import type { AddFoodFormData } from "./types";

/**
 * Трансформирует Product из API в AddFoodFormData
 * По умолчанию использует 100g порцию
 */
export function transformProduct(product: Product): AddFoodFormData {
  return {
    name: product.name,
    calories: String(product.kcalPer100g),
    protein: String(product.proteinPer100g || 0),
    fat: String(product.fatPer100g || 0),
    carbs: String(product.carbsPer100g || 0),
  };
}

/**
 * Трансформирует массив продуктов
 */
export function transformProducts(products: Product[]): AddFoodFormData[] {
  return products.map(transformProduct);
}

/**
 * Трансформирует ProductItemData из формы создания в AddFoodFormData
 */
export function transformProductItemData(
  productItemData: ProductItemData
): AddFoodFormData {
  return {
    name: productItemData.name,
    calories: String(productItemData.calories),
    protein: String(productItemData.protein),
    fat: String(productItemData.fat),
    carbs: String(productItemData.carbs),
  };
}
