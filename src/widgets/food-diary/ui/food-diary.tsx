"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/primitives/card";
import { MealCard } from "./meal-card";
import { useFoodDiary } from "../model/use-food-diary";
import { useI18n } from "../i18n";

export function FoodDiary() {
  const { meals, addFood, removeFood } = useFoodDiary();
  const { t } = useI18n();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              onAddFood={(formData) => addFood(meal.id, formData)}
              onRemoveFood={(foodId) => removeFood(meal.id, foodId)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
