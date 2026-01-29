import { useDayData } from "@/features/day-data";
import { useAuthStore } from "@/entities/auth";
import { useSelectedDate } from "@/entities/select-date";
import { useGoals } from "@/features/goals";

const DEFAULT_CALORIE_GOAL = 2500;

export function useCalorieData() {
  const selectedDateString = useSelectedDate(
    (state) => state.selectedDateString,
  );
  const user = useAuthStore((state) => state.user);

  const { data: dayData, isLoading } = useDayData({
    date: selectedDateString,
  });

  const { data: userGoals } = useGoals();

  const consumedKcal = dayData?.consumedKcal ?? 0;

  const userGoal = userGoals?.dailyKcalGoal;

  const targetKcal =
    dayData?.targetKcal ||
    (userGoal && userGoal > 0 ? userGoal : DEFAULT_CALORIE_GOAL);

  const remainingKcal = targetKcal - consumedKcal;

  return {
    caloriesTotal: targetKcal,
    caloriesConsumed: consumedKcal,
    caloriesRemaining: remainingKcal,
    isLoading,
  };
}
