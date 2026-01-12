import { X } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import { UiText } from "@/shared/ui/ui-text";
import type { FoodItem as FoodItemType } from "../model/types";
import { useI18n } from "../i18n";

interface FoodItemProps {
  item: FoodItemType;
  onEdit: () => void;
  onDelete: () => void;
}

export function FoodItem({ item, onEdit, onDelete }: FoodItemProps) {
  const { t } = useI18n();

  const formatValue = (value: number | undefined) =>
    value !== undefined ? Math.round(value * 10) / 10 : 0;

  return (
    <div
      onClick={onEdit}
      className="flex items-center justify-between bg-background/50 rounded-lg px-2 py-1.5 group hover:ring-2 hover:ring-inset hover:ring-primary transition-all cursor-pointer"
    >
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <UiText as="span" variant="small" className="truncate text-xs">
          {item.name}
        </UiText>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span>P: {formatValue(item.protein)}g</span>
          <span>F: {formatValue(item.fat)}g</span>
          <span>C: {formatValue(item.carbs)}g</span>
          {item.fiber !== undefined && item.fiber > 0 && (
            <span>Fb: {formatValue(item.fiber)}g</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <div className="flex flex-col items-end gap-0.5">
          <UiText variant="muted" className="text-xs">
            {formatValue(item.calories)} {t("kcal")}
          </UiText>
          <UiText variant="muted" className="text-[10px]">
            {item.quantity ?? 0} {t("g")}
          </UiText>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 hover:bg-destructive/20 hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
