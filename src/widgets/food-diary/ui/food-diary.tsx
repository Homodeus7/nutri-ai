"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/primitives/card";
import { MealCard } from "./meal-card";
import { useFoodDiary } from "../model/use-food-diary";
import { useSelectedDate, useDayData } from "@/features/day-data";
import { useI18n } from "../i18n";
import { mergeMealsWithBase } from "../model/merge-meals";

export function FoodDiary() {
  const { removeFood } = useFoodDiary();
  const { t } = useI18n();
  const dateString = useSelectedDate((state) => state.selectedDateString);

  // Fetch day data based on selected date
  const { data: dayData, isLoading } = useDayData({
    date: dateString,
    queryOptions: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  const apiMeals = dayData?.meals ?? [];
  const meals = mergeMealsWithBase(apiMeals);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {meals.map((meal) => (
            <MealCard
              key={meal.type}
              date={dateString}
              meal={meal}
              onRemoveFood={(foodId) => removeFood(meal.id, foodId)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
