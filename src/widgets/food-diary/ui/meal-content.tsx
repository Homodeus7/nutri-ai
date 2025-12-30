"use client";

import { useState } from "react";
import { FoodItem } from "./food-item";
import { MealTotals } from "./meal-totals";
import { UiText } from "@/shared/ui/ui-text";
import type { FoodItem as FoodItemType, NutritionTotals } from "../model/types";
import { useI18n } from "../i18n";
import { useMealCardContext } from "../model/meal-card-context";
import {
  UpdateMealProductDialog,
  RemoveMealProductDialog,
} from "@/features/meal";

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
      {/* <UiText variant="muted" className="text-xs mt-1">
        {t("clickToAdd")}
      </UiText> */}
    </div>
  );
}

export function MealContent({ items, totals }: MealContentProps) {
  const { mealId } = useMealCardContext();
  const [editingProduct, setEditingProduct] = useState<FoodItemType | null>(
    null,
  );
  const [deletingProduct, setDeletingProduct] = useState<FoodItemType | null>(
    null,
  );

  const hasItems = items.length > 0;

  if (!hasItems) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="space-y-3">
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {items.map((item) => (
            <FoodItem
              key={item.id}
              item={item}
              onEdit={() => setEditingProduct(item)}
              onDelete={() => setDeletingProduct(item)}
            />
          ))}
        </div>
        <MealTotals totals={totals} />
      </div>

      {editingProduct && (
        <UpdateMealProductDialog
          productId={editingProduct.id}
          productName={editingProduct.name}
          currentQuantity={editingProduct.quantity ?? 0}
          mealId={mealId}
          isOpen={!!editingProduct}
          onOpenChange={(open) => !open && setEditingProduct(null)}
        />
      )}

      {deletingProduct && (
        <RemoveMealProductDialog
          productId={deletingProduct.id}
          productName={deletingProduct.name}
          mealId={mealId}
          isOpen={!!deletingProduct}
          onOpenChange={(open) => !open && setDeletingProduct(null)}
        />
      )}
    </>
  );
}
