import type { Meal } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import type { MealData } from "./types";
import { INITIAL_MEALS } from "./constants";
import { transformMealToMealData } from "./transform-meal";

/**
 * Merges API meals with base meal cards.
 * Always returns 4 base meal cards (breakfast, lunch, dinner, snack),
 * populated with data from API if available.
 * Combines items from multiple meals of the same type.
 */
export function mergeMealsWithBase(apiMeals: Meal[]): MealData[] {
  // Group API meals by type, combining items from multiple meals
  const mealsByType = new Map<string, Meal[]>();
  apiMeals.forEach((meal) => {
    // Only keep breakfast, lunch, dinner, snack (ignore "other")
    if (["breakfast", "lunch", "dinner", "snack"].includes(meal.type)) {
      const existing = mealsByType.get(meal.type) || [];
      mealsByType.set(meal.type, [...existing, meal]);
    }
  });

  // Map base meals, replacing with API data where available
  return INITIAL_MEALS.map((baseMeal) => {
    const apiMealsForType = mealsByType.get(baseMeal.type);

    if (apiMealsForType && apiMealsForType.length > 0) {
      // Transform all meals and combine their items
      const allItems = apiMealsForType.flatMap((apiMeal) => {
        const transformed = transformMealToMealData(apiMeal);
        return transformed.items;
      });

      // Use the first meal's ID and name (or fallback to type)
      const firstMeal = apiMealsForType[0];
      const transformedFirst = transformMealToMealData(firstMeal);

      return {
        ...baseMeal,
        id: transformedFirst.id,
        name: transformedFirst.name,
        items: allItems,
        // Preserve base icon, colors, and type
        icon: baseMeal.icon,
        color: baseMeal.color,
        bgColor: baseMeal.bgColor,
        type: baseMeal.type,
      };
    }

    // Return copy of base meal if no API data
    return { ...baseMeal, items: [] };
  });
}
