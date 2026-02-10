"use client";

import { useMemo } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui/primitives/tabs";
import { ProductsTable } from "@/features/product/search-product";
import {
  useGetProductsRecent,
  MealType,
} from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useI18n } from "../i18n";

interface RecentProductsTabProps {
  mealType: MealType;
  onAddProducts: () => void;
  onShowCreateForm: () => void;
  isPending: boolean;
}

const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: "Завтрак",
  lunch: "Обед",
  dinner: "Ужин",
  snack: "Перекус",
  other: "Другое",
};

export function RecentProductsTab({
  mealType,
  onAddProducts,
  onShowCreateForm,
  isPending,
}: RecentProductsTabProps) {
  const { t } = useI18n();

  const { data, isLoading } = useGetProductsRecent({
    mealType,
    limit: 10,
  });

  const recentByMealType = data?.recentByMealType ?? [];
  const recentByOtherMeals = data?.recentByOtherMeals ?? [];

  const hasData = recentByMealType.length > 0 || recentByOtherMeals.length > 0;

  const currentMealLabel = MEAL_TYPE_LABELS[mealType];

  if (isLoading) {
    return (
      <div className="text-center text-sm text-muted-foreground py-8 flex-1">
        Загрузка...
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="text-center text-sm text-muted-foreground py-8 flex-1">
        Нет недавно использованных продуктов
      </div>
    );
  }

  return (
    <Tabs
      defaultValue="current"
      className="w-full flex-1 min-h-0 flex flex-col"
    >
      <TabsList className="grid w-full grid-cols-2 shrink-0">
        <TabsTrigger value="current">
          {currentMealLabel} ({recentByMealType.length})
        </TabsTrigger>
        <TabsTrigger value="other">
          Другие ({recentByOtherMeals.length})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="current" className="flex-1 flex flex-col min-h-0">
        {recentByMealType.length > 0 ? (
          <ProductsTable
            products={recentByMealType}
            onAddProducts={onAddProducts}
            onCreateProduct={onShowCreateForm}
            isPending={isPending}
          />
        ) : (
          <div className="text-center text-sm text-muted-foreground py-8 flex-1">
            Нет продуктов для этого типа приема пищи
          </div>
        )}
      </TabsContent>
      <TabsContent value="other" className="flex-1 flex flex-col min-h-0">
        {recentByOtherMeals.length > 0 ? (
          <ProductsTable
            products={recentByOtherMeals}
            onAddProducts={onAddProducts}
            onCreateProduct={onShowCreateForm}
            isPending={isPending}
          />
        ) : (
          <div className="text-center text-sm text-muted-foreground py-8 flex-1">
            Нет продуктов для других типов приемов пищи
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
