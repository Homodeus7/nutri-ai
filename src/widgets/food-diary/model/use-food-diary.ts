import { useState, useCallback } from "react";
import { INITIAL_MEALS } from "./constants";
import type { MealData, FoodItem, AddFoodFormData } from "./types";

export function useFoodDiary() {
  const [meals, setMeals] = useState<MealData[]>(INITIAL_MEALS);

  const addFood = useCallback((mealId: string, formData: AddFoodFormData) => {
    const foodItem: FoodItem = {
      id: Date.now().toString(),
      name: formData.name,
      calories: Number(formData.calories) || 0,
      protein: Number(formData.protein) || 0,
      fat: Number(formData.fat) || 0,
      carbs: Number(formData.carbs) || 0,
    };

    setMeals((prev) =>
      prev.map((meal) =>
        meal.id === mealId
          ? { ...meal, items: [...meal.items, foodItem] }
          : meal,
      ),
    );
  }, []);

  const removeFood = useCallback((mealId: string, foodId: string) => {
    setMeals((prev) =>
      prev.map((meal) =>
        meal.id === mealId
          ? { ...meal, items: meal.items.filter((item) => item.id !== foodId) }
          : meal,
      ),
    );
  }, []);

  return {
    meals,
    addFood,
    removeFood,
  };
}
