import { Sun, Coffee, Utensils, Moon, Apple } from "lucide-react";
import type {
  Meal,
  FoodItem as ApiFoodItem,
} from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import type { MealData, FoodItem } from "./types";

const MEAL_CONFIG = {
  breakfast: {
    icon: Sun,
    color: "text-orange-500",
    bgColor: "bg-orange-500/20",
  },
  lunch: {
    icon: Utensils,
    color: "text-green-500",
    bgColor: "bg-green-500/20",
  },
  dinner: {
    icon: Moon,
    color: "text-purple-500",
    bgColor: "bg-purple-500/20",
  },
  snack: {
    icon: Coffee,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/20",
  },
  other: {
    icon: Apple,
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
  },
} as const;

function transformFoodItem(apiItem: ApiFoodItem): FoodItem {
  return {
    id: apiItem.id,
    name: apiItem.name,
    calories: apiItem.kcal,
    protein: apiItem.protein ?? 0,
    fat: apiItem.fat ?? 0,
    carbs: apiItem.carbs ?? 0,
  };
}

export function transformMealToMealData(apiMeal: Meal): MealData {
  const config = MEAL_CONFIG[apiMeal.type] || MEAL_CONFIG.other;

  return {
    id: apiMeal.id,
    name: apiMeal.name || apiMeal.type,
    type: apiMeal.type,
    icon: config.icon,
    color: config.color,
    bgColor: config.bgColor,
    items: (apiMeal.items ?? []).map(transformFoodItem),
  };
}
