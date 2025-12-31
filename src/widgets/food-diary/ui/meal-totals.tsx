import { Progress } from "@radix-ui/react-progress";
import { UiText } from "@/shared/ui/ui-text";
import type { NutritionTotals } from "../model/types";
import { NUTRITION_GOALS } from "../model/constants";
import { useI18n } from "../i18n";

interface MealTotalsProps {
  totals: NutritionTotals;
}

interface NutrientProgressProps {
  label: string;
  value: number;
  goal: number;
  unit: string;
  colorClass: string;
}

function NutrientProgress({
  label,
  value,
  goal,
  unit,
  colorClass,
}: NutrientProgressProps) {
  const percentage = Math.min((value / goal) * 100, 100);
  const formattedValue = Math.round(value * 10) / 10;

  return (
    <div className="text-center">
      <UiText variant="muted" className="text-xs">
        {label}
      </UiText>
      <Progress value={percentage} className={`h-1.5 mt-1 ${colorClass}`} />
      <UiText variant="small" weight="medium" className="mt-1">
        {formattedValue}
        {unit}
      </UiText>
    </div>
  );
}

export function MealTotals({ totals }: MealTotalsProps) {
  const { t } = useI18n();

  const nutrients = [
    {
      key: "protein",
      label: t("protein"),
      value: totals.protein,
      goal: NUTRITION_GOALS.protein,
      colorClass: "bg-green-200",
    },
    {
      key: "fat",
      label: t("fat"),
      value: totals.fat,
      goal: NUTRITION_GOALS.fat,
      colorClass: "bg-orange-200",
    },
    {
      key: "carbs",
      label: t("carbs"),
      value: totals.carbs,
      goal: NUTRITION_GOALS.carbs,
      colorClass: "bg-yellow-200",
    },
  ] as const;

  const formattedCalories = Math.round(totals.calories);

  return (
    <div className="bg-background/70 rounded-lg p-3 space-y-2">
      <div className="flex justify-between">
        <UiText variant="small" weight="medium">
          {t("totalCalories")}
        </UiText>
        <UiText variant="small" weight="medium">
          {formattedCalories} {t("kcal")}
        </UiText>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {nutrients.map((nutrient) => (
          <NutrientProgress
            key={nutrient.key}
            label={nutrient.label}
            value={nutrient.value}
            goal={nutrient.goal}
            unit={t("g")}
            colorClass={nutrient.colorClass}
          />
        ))}
      </div>
    </div>
  );
}
