import { X } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import { UiText } from "@/shared/ui/ui-text";
import type { FoodItem as FoodItemType } from "../model/types";
import { useI18n } from "../i18n";

interface FoodItemProps {
  item: FoodItemType;
  onRemove: () => void;
}

export function FoodItem({ item, onRemove }: FoodItemProps) {
  const { t } = useI18n();

  return (
    <div className="flex items-center justify-between bg-background/50 rounded-lg px-3 py-2 text-sm">
      <UiText as="span" variant="small" className="truncate flex-1">{item.name}</UiText>
      <div className="flex items-center gap-2">
        <UiText variant="muted" className="text-sm">
          {item.calories} {t("kcal")}
        </UiText>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 hover:bg-destructive/20 hover:text-destructive"
          onClick={onRemove}
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
