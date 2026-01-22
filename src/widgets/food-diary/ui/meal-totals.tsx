import type { NutritionTotals } from "../model/types";
import { useI18n } from "../i18n";

interface MealTotalsProps {
  totals: NutritionTotals;
}

export function MealTotals({ totals }: MealTotalsProps) {
  const { t } = useI18n();

  const formatValue = (value: number) => Math.round(value * 10) / 10;

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span>
        {t("protein")}: {formatValue(totals.protein)}
        {t("g")}
      </span>
      <span>
        {t("fat")}: {formatValue(totals.fat)}
        {t("g")}
      </span>
      <span>
        {t("carbs")}: {formatValue(totals.carbs)}
        {t("g")}
      </span>
      <span>
        {t("fiber")}: {formatValue(totals.fiber)}
        {t("g")}
      </span>
    </div>
  );
}
