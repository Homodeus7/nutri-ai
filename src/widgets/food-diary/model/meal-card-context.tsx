"use client";

import { createContext, useContext } from "react";

interface MealCardContextValue {
  date: string;
  mealId: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack" | "other";
  mealName: string;
}

const MealCardContext = createContext<MealCardContextValue | null>(null);

export function useMealCardContext() {
  const context = useContext(MealCardContext);
  if (!context) {
    throw new Error("useMealCardContext must be used within MealCardProvider");
  }
  return context;
}

export const MealCardProvider = MealCardContext.Provider;
