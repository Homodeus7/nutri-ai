import { useMemo } from "react";
import { Card, CardContent } from "@/shared/ui/primitives/card";
import { MealHeader } from "./meal-header";
import { MealContent } from "./meal-content";
import type { MealData, NutritionTotals } from "../model/types";
import { useI18n } from "../i18n";
import { MealCardProvider } from "../model/meal-card-context";

interface MealCardProps {
  date: string;
  meal: MealData;
}

function calculateTotals(meal: MealData): NutritionTotals {
  return meal.items.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      fat: acc.fat + item.fat,
      carbs: acc.carbs + item.carbs,
      fiber: acc.fiber + (item.fiber ?? 0),
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0, fiber: 0 },
  );
}

export function MealCard({ date, meal }: MealCardProps) {
  const { t } = useI18n();
  const totals = useMemo(() => calculateTotals(meal), [meal]);
  const mealName = t(meal.type);
  const isEmpty = meal.items.length === 0;

  const contextValue = useMemo(
    () => ({
      date,
      mealId: meal.id,
      mealType: meal.type,
      mealName,
    }),
    [date, meal.id, meal.type, mealName],
  );

  return (
    <MealCardProvider value={contextValue}>
      <Card className={`${meal.bgColor} border-0`}>
        <CardContent className="flex flex-col gap-2">
          <MealHeader
            name={mealName}
            icon={meal.icon}
            color={meal.color}
            isEmpty={isEmpty}
            calories={totals.calories}
          />
          <MealContent items={meal.items} totals={totals} />
        </CardContent>
      </Card>
    </MealCardProvider>
  );
}
