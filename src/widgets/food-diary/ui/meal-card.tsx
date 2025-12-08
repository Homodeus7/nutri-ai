import { useMemo } from "react";
import { Card, CardContent } from "@/shared/ui/primitives/card";
import { MealHeader } from "./meal-header";
import { MealContent } from "./meal-content";
import type {
  MealData,
  AddFoodFormData,
  NutritionTotals,
} from "../model/types";
import { useI18n } from "../i18n";

interface MealCardProps {
  meal: MealData;
  onAddFood: (formData: AddFoodFormData) => void;
  onRemoveFood: (foodId: string) => void;
}

function calculateTotals(meal: MealData): NutritionTotals {
  return meal.items.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      fat: acc.fat + item.fat,
      carbs: acc.carbs + item.carbs,
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0 },
  );
}

export function MealCard({ meal, onAddFood, onRemoveFood }: MealCardProps) {
  const { t } = useI18n();
  const totals = useMemo(() => calculateTotals(meal), [meal]);
  const mealName = t(meal.id as "breakfast" | "lunch" | "dinner" | "snack");

  return (
    <Card className={`${meal.bgColor} border-0`}>
      <CardContent className="">
        <MealHeader
          name={mealName}
          icon={meal.icon}
          color={meal.color}
          onAddFood={onAddFood}
        />
        <MealContent
          items={meal.items}
          totals={totals}
          onRemoveFood={onRemoveFood}
        />
      </CardContent>
    </Card>
  );
}
