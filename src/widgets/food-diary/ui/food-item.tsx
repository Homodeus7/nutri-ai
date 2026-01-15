import { X } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import { Badge } from "@/shared/ui/primitives/badge";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemActions,
} from "@/shared/ui/primitives/item";
import type { FoodItem as FoodItemType } from "../model/types";
import { useI18n } from "../i18n";

interface FoodItemProps {
  item: FoodItemType;
  onEdit: () => void;
  onDelete: () => void;
}

const MACROS = [
  { key: "protein", label: "P" },
  { key: "fat", label: "F" },
  { key: "carbs", label: "C" },
  { key: "fiber", label: "Fb" },
] as const;

export function FoodItem({ item, onEdit, onDelete }: FoodItemProps) {
  const { t } = useI18n();

  const formatValue = (value: number | undefined) =>
    value !== undefined ? Math.round(value * 10) / 10 : 0;

  return (
    <Item
      variant="muted"
      size="sm"
      onClick={onEdit}
      className="cursor-pointer bg-background/50 hover:ring-2 hover:ring-inset hover:ring-primary py-1 px-2"
    >
      <ItemContent className="min-w-0">
        <ItemTitle className="text-xs truncate">{item.name}</ItemTitle>
        <div className="flex items-center gap-0.5">
          {MACROS.map(({ key, label }) => {
            const value = item[key];
            return (
              <span key={key} className="text-[10px] text-muted-foreground">
                {label}: {formatValue(value)}
              </span>
            );
          })}
        </div>
      </ItemContent>
      <ItemContent className="flex-none items-end text-muted-foreground">
        <span className="text-xs">
          {formatValue(item.calories)} {t("kcal")}
        </span>
        <span className="text-[10px]">
          {item.quantity ?? 0} {t("g")}
        </span>
      </ItemContent>
      <ItemActions>
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
      </ItemActions>
    </Item>
  );
}
