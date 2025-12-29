"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import { UiText } from "@/shared/ui/ui-text";
import type { FoodItem as FoodItemType } from "../model/types";
import { useI18n } from "../i18n";
import { useMealCardContext } from "../model/meal-card-context";
import {
  UpdateMealProductDialog,
  RemoveMealProductDialog,
} from "@/features/meal";

interface FoodItemProps {
  item: FoodItemType;
}

export function FoodItem({ item }: FoodItemProps) {
  const { t } = useI18n();
  const { mealId } = useMealCardContext();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsEditOpen(true)}
        className="flex items-center justify-between bg-background/50 rounded-lg px-3 py-2 group hover:ring-2 hover:ring-inset hover:ring-primary transition-all cursor-pointer"
      >
        <UiText as="span" variant="small" className="truncate">
          {item.name}
        </UiText>
        <div className="flex items-center gap-2">
          <UiText variant="muted" className="text-sm">
            {item.quantity ?? 0} {t("g")}
          </UiText>
          <UiText variant="muted" className="text-sm">
            {item.calories} {t("kcal")}
          </UiText>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-destructive/20 hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleteOpen(true);
            }}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <UpdateMealProductDialog
        productId={item.id}
        productName={item.name}
        currentQuantity={item.quantity ?? 0}
        mealId={mealId}
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <RemoveMealProductDialog
        productId={item.id}
        productName={item.name}
        mealId={mealId}
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
    </>
  );
}
