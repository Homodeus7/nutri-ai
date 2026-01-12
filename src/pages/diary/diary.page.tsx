"use client";

import { UiText } from "@/shared/ui/ui-text";
import { CalorieTracker } from "@/widgets/calorie-tracker";
import { DatePicker } from "@/widgets/date-picker";
import { FoodDiary } from "@/widgets/food-diary";
import { MacrosGrid } from "@/widgets/macros-grid";
import { useGreeting } from "./model/use-greeting";
import { useAuthStore } from "@/entities/auth";

export function DiaryPage() {
  const greeting = useGreeting();
  const { user } = useAuthStore();
  return (
    <div className="space-y-6">
      <UiText variant="h3">
        {greeting}, {user?.displayName}!
      </UiText>

      <DatePicker />

      <div className="w-full flex gap-4 justify-between">
        <CalorieTracker caloriesRemaining={1672} caloriesTotal={2500} />
        <MacrosGrid />
      </div>
      <FoodDiary />
    </div>
  );
}
