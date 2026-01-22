"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import { useIsMobile } from "@/shared/lib/use-media-query";
import { FoodItem } from "./food-item";
import { MealTotals } from "./meal-totals";
import { MealEmptyState } from "./meal-empty-state";
import type { FoodItem as FoodItemType, NutritionTotals } from "../model/types";
import { useMealCardContext } from "../model/meal-card-context";
import {
  UpdateMealProductDialog,
  RemoveMealProductDialog,
} from "@/features/meal";

interface MealContentProps {
  items: FoodItemType[];
  totals: NutritionTotals;
}

export function MealContent({ items, totals }: MealContentProps) {
  const { mealId } = useMealCardContext();
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(true);
  const [editingProduct, setEditingProduct] = useState<FoodItemType | null>(
    null,
  );
  const [deletingProduct, setDeletingProduct] = useState<FoodItemType | null>(
    null,
  );

  const hasItems = items.length > 0;

  if (!hasItems) {
    // На мобильных не показываем empty state
    if (isMobile) {
      return null;
    }
    return <MealEmptyState />;
  }

  // На десктопе всегда показываем список
  const shouldShowItems = !isMobile || isExpanded;

  return (
    <>
      <div className="space-y-2">
        <div
          className={`flex items-center justify-between ${isMobile ? "cursor-pointer" : ""}`}
          onClick={isMobile ? () => setIsExpanded(!isExpanded) : undefined}
        >
          <MealTotals totals={totals} />
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>

        {shouldShowItems && (
          <div className="space-y-2 max-h-64 overflow-y-auto [scrollbar-width:thin]">
            {items.map((item) => (
              <FoodItem
                key={item.id}
                item={item}
                onEdit={() => setEditingProduct(item)}
                onDelete={() => setDeletingProduct(item)}
              />
            ))}
          </div>
        )}
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
