"use client";

import dynamic from "next/dynamic";
import { Video } from "lucide-react";
import { Skeleton, useControlledDialog } from "@/shared/ui";
import { UiButton } from "@/shared/ui/ui-button";
import { UiText } from "@/shared/ui/ui-text";
import { DatePicker } from "@/widgets/date-picker";
import { MacrosGrid } from "@/widgets/macros-grid";
import { useGreeting } from "./model/use-greeting";
import { useCalorieData } from "./model/use-calorie-data";
import { useAuthStore } from "@/entities/auth";
import { useDayData, useConsumedMacros, useSelectedDate } from "@/features/day-data";
import { useGoals, calculateGrams } from "@/features/goals";
import { useColorTheme } from "@/features/theme";
import { VideoDialog } from "@/features/video";
import type { DailySummaryProps } from "@/features/video";

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
  const { caloriesRemaining, caloriesTotal, caloriesConsumed } = useCalorieData();
  const macros = useConsumedMacros((state) => state.macros);
  const selectedDateString = useSelectedDate((state) => state.selectedDateString);
  const { data: dayData } = useDayData({ date: selectedDateString });
  const { data: goalsData } = useGoals();
  const { colorTheme } = useColorTheme();
  const videoDialog = useControlledDialog();

  const gramGoals = calculateGrams(
    goalsData?.dailyKcalGoal ?? caloriesTotal,
    goalsData?.proteinPct ?? 30,
    goalsData?.fatPct ?? 25,
    goalsData?.carbsPct ?? 45,
  );

  const dailyVideoData: DailySummaryProps = {
    calories: caloriesConsumed,
    caloriesGoal: caloriesTotal,
    protein: macros.protein,
    fat: macros.fat,
    carbs: macros.carbs,
    fiber: macros.fiber,
    proteinGoal: gramGoals.proteinGrams,
    fatGoal: gramGoals.fatGrams,
    carbsGoal: gramGoals.carbsGrams,
    fiberGoal: 30,
    themeColor: colorTheme ?? "orange",
    date: selectedDateString,
    meals:
      dayData?.meals?.map((meal) => ({
        type: meal.type,
        name: meal.name ?? meal.type,
        totalKcal: meal.totalKcal,
      })) ?? [],
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <UiText variant="h3">
          {greeting}, {user?.displayName}!
        </UiText>
        <UiButton variant="outline" size="icon" onClick={videoDialog.open}>
          <Video className="size-4" />
        </UiButton>
      </div>

      <DatePicker />

      <VideoDialog
        isOpen={videoDialog.isOpen}
        onOpenChange={videoDialog.setOpen}
        dailyData={dailyVideoData}
      />

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
