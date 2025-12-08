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
  const percentage = (value / goal) * 100;

  return (
    <div className="text-center">
      <UiText variant="muted" className="text-xs">{label}</UiText>
      <Progress value={percentage} className={`h-1.5 mt-1 ${colorClass}`} />
      <UiText variant="small" weight="medium" className="mt-1">
        {value}
        {unit}
      </UiText>
    </div>
  );
}

export function MealTotals({ totals }: MealTotalsProps) {
  const { t } = useI18n();

  return (
    <div className="bg-background/70 rounded-lg p-3 space-y-2">
      <div className="flex justify-between">
        <UiText variant="small" weight="medium">{t("totalCalories")}</UiText>
        <UiText variant="small" weight="medium">
          {totals.calories} {t("kcal")}
        </UiText>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <NutrientProgress
          label={t("protein")}
          value={totals.protein}
          goal={NUTRITION_GOALS.protein}
          unit={t("g")}
          colorClass="bg-green-200"
        />
        <NutrientProgress
          label={t("fat")}
          value={totals.fat}
          goal={NUTRITION_GOALS.fat}
          unit={t("g")}
          colorClass="bg-orange-200"
        />
        <NutrientProgress
          label={t("carbs")}
          value={totals.carbs}
          goal={NUTRITION_GOALS.carbs}
          unit={t("g")}
          colorClass="bg-yellow-200"
        />
      </div>
    </div>
  );
}
