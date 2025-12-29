import { FoodItem } from "./food-item";
import { MealTotals } from "./meal-totals";
import { UiText } from "@/shared/ui/ui-text";
import type { FoodItem as FoodItemType, NutritionTotals } from "../model/types";
import { useI18n } from "../i18n";

interface MealContentProps {
  items: FoodItemType[];
  totals: NutritionTotals;
}

function EmptyState() {
  const { t } = useI18n();

  return (
    <div className="text-center py-6">
      <UiText variant="small" className="text-muted-foreground">
        {t("noEntries")}
      </UiText>
      <UiText variant="muted" className="text-xs mt-1">
        {t("clickToAdd")}
      </UiText>
    </div>
  );
}

export function MealContent({ items, totals }: MealContentProps) {
  const hasItems = items.length > 0;

  if (!hasItems) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {items.map((item) => (
          <FoodItem key={item.id} item={item} />
        ))}
      </div>
      <MealTotals totals={totals} />
    </div>
  );
}
