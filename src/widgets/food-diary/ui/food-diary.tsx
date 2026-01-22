"use client";

import { useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/primitives/card";
import { MealCard } from "./meal-card";
import {
  useSelectedDate,
  useDayData,
  useConsumedMacros,
} from "@/features/day-data";
import { useI18n } from "../i18n";
import { mergeMealsWithBase } from "../model/merge-meals";

export function FoodDiary() {
  const { t } = useI18n();
  const dateString = useSelectedDate((state) => state.selectedDateString);
  const setMacros = useConsumedMacros((state) => state.setMacros);

  const { data: dayData } = useDayData({
    date: dateString,
  });

  const meals = useMemo(
    () => mergeMealsWithBase(dayData?.meals ?? []),
    [dayData?.meals],
  );

  const totals = useMemo(() => {
    let protein = 0;
    let fat = 0;
    let carbs = 0;
    let fiber = 0;
    let calories = 0;

    for (const meal of meals) {
      for (const item of meal.items) {
        protein += item.protein ?? 0;
        fat += item.fat ?? 0;
        carbs += item.carbs ?? 0;
        fiber += item.fiber ?? 0;
        calories += item.calories ?? 0;
      }
    }

    return {
      protein: Math.round(protein * 10) / 10,
      fat: Math.round(fat * 10) / 10,
      carbs: Math.round(carbs * 10) / 10,
      fiber: Math.round(fiber * 10) / 10,
      calories: Math.round(calories),
    };
  }, [meals]);

  useEffect(() => {
    setMacros(totals);
  }, [totals, setMacros]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {meals.map((meal) => (
            <MealCard key={meal.type} date={dateString} meal={meal} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
