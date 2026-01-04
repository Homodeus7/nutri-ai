"use client";

import { UiText } from "@/shared/ui/ui-text";
import { CalorieTracker } from "@/widgets/calorie-tracker";
import { DatePicker } from "@/widgets/date-picker";
import { FoodDiary } from "@/widgets/food-diary";
import { MacrosGrid } from "@/widgets/macros-grid";
import { useGreeting } from "./model/use-greeting";
import { useAuthStore } from "@/entities/auth";

export function BoardPage() {
  const greeting = useGreeting();
  const { user } = useAuthStore();
  return (
    <div className="space-y-6">
      <UiText variant="h3">
        {greeting}, {user?.displayName}!
      </UiText>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <DatePicker />
        </div>
      </div>
      <div className="w-full flex gap-4 justify-between lg:flex-col">
        <CalorieTracker caloriesRemaining={1672} caloriesTotal={2500} />
        <MacrosGrid />
      </div>
      <FoodDiary />
    </div>
  );
}
