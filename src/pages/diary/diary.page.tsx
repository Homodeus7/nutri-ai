"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/shared/ui";
import { UiText } from "@/shared/ui/ui-text";
import { DatePicker } from "@/widgets/date-picker";
import { MacrosGrid } from "@/widgets/macros-grid";
import { useGreeting } from "./model/use-greeting";
import { useCalorieData } from "./model/use-calorie-data";
import { useAuthStore } from "@/entities/auth";
import { useConsumedMacros } from "@/features/day-data";

const CalorieRadialChart = dynamic(
  () =>
    import("@/widgets/calorie-radial-chart").then(
      (mod) => mod.CalorieRadialChart,
    ),
  { ssr: false, loading: () => <Skeleton className="h-[280px] w-full" /> },
);

const MacrosPieChart = dynamic(
  () =>
    import("@/widgets/macros-pie-chart").then((mod) => mod.MacrosPieChart),
  { ssr: false, loading: () => <Skeleton className="h-[280px] w-full" /> },
);

const FoodDiary = dynamic(
  () => import("@/widgets/food-diary").then((mod) => mod.FoodDiary),
  { loading: () => <Skeleton className="h-[400px] w-full" /> },
);

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
