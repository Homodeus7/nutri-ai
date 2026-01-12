"use client";

import { UiText } from "@/shared/ui/ui-text";
import { CalorieTracker } from "@/widgets/calorie-tracker";
import { DatePicker } from "@/widgets/date-picker";
import { FoodDiary } from "@/widgets/food-diary";
import { MacrosGrid } from "@/widgets/macros-grid";
import { useGreeting } from "./model/use-greeting";
import { useCalorieData } from "./model/use-calorie-data";
import { useAuthStore } from "@/entities/auth";

export function DiaryPage() {
  const greeting = useGreeting();
  const { user } = useAuthStore();
  const { caloriesRemaining, caloriesTotal } = useCalorieData();

  return (
    <div className="space-y-6">
      <UiText variant="h3">
        {greeting}, {user?.displayName}!
      </UiText>

      <DatePicker />

      <div className="w-full flex gap-4 justify-between">
        <CalorieTracker
          caloriesRemaining={caloriesRemaining}
          caloriesTotal={caloriesTotal}
        />
        <MacrosGrid />
      </div>
      <FoodDiary />
    </div>
  );
}
