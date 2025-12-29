"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/primitives/card";
import { MealCard } from "./meal-card";
import { useSelectedDate, useDayData } from "@/features/day-data";
import { useI18n } from "../i18n";
import { mergeMealsWithBase } from "../model/merge-meals";

export function FoodDiary() {
  const { t } = useI18n();
  const dateString = useSelectedDate((state) => state.selectedDateString);

  const { data: dayData } = useDayData({
    date: dateString,
  });

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
            <MealCard key={meal.type} date={dateString} meal={meal} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
