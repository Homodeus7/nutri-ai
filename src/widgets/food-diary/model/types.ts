export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export type MealType = "breakfast" | "lunch" | "dinner" | "snack" | "other";

export interface MealData {
  id: string;
  name: string;
  type: MealType;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  items: FoodItem[];
}

export interface NutritionTotals {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface AddFoodFormData {
  name: string;
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
}
