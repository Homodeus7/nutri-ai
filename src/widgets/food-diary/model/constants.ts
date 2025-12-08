import { Sun, Coffee, Utensils, Moon } from "lucide-react";
import type { MealData } from "./types";

export const INITIAL_MEALS: MealData[] = [
  {
    id: "breakfast",
    name: "Завтрак",
    icon: Sun,
    color: "text-orange-500",
    bgColor: "bg-orange-500/20",
    items: [],
  },
  {
    id: "lunch",
    name: "Обед",
    icon: Utensils,
    color: "text-green-500",
    bgColor: "bg-green-500/20",
    items: [],
  },
  {
    id: "dinner",
    name: "Ужин",
    icon: Moon,
    color: "text-purple-500",
    bgColor: "bg-purple-500/20",
    items: [],
  },
  {
    id: "snack",
    name: "Перекус",
    icon: Coffee,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/20",
    items: [],
  },
];

export const NUTRITION_GOALS = {
  protein: 50,
  fat: 30,
  carbs: 80,
} as const;
