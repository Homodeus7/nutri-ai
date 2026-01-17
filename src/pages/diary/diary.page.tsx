"use client";

import { UiText } from "@/shared/ui/ui-text";
import { CalorieRadialChart } from "@/widgets/calorie-radial-chart";
import { DatePicker } from "@/widgets/date-picker";
import { FoodDiary } from "@/widgets/food-diary";
import { MacrosGrid } from "@/widgets/macros-grid";
import { MacrosPieChart } from "@/widgets/macros-pie-chart";
import { useGreeting } from "./model/use-greeting";
import { useCalorieData } from "./model/use-calorie-data";
import { useAuthStore } from "@/entities/auth";
import { useConsumedMacros } from "@/features/day-data";

export function DiaryPage() {
  const greeting = useGreeting();
  const { user } = useAuthStore();
  const { caloriesRemaining, caloriesTotal } = useCalorieData();
  const macros = useConsumedMacros((state) => state.macros);

  return (
    <>
      <UiText variant="h3">
        {greeting}, {user?.displayName}!
      </UiText>

      <DatePicker />

      <div className="w-full flex flex-col xl:flex-row gap-4">
        <div className="w-full flex flex-col md:flex-row gap-4 justify-between">
          <CalorieRadialChart
            caloriesRemaining={caloriesRemaining}
            caloriesTotal={caloriesTotal}
          />
          <MacrosPieChart
            protein={macros.protein}
            fat={macros.fat}
            carbs={macros.carbs}
          />
        </div>
        <MacrosGrid
          protein={macros.protein}
          fat={macros.fat}
          carbs={macros.carbs}
          fiber={macros.fiber}
        />
      </div>
      <FoodDiary />
    </>
  );
}
