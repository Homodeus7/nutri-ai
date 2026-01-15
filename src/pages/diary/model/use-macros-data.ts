import { useMemo } from "react";
import { useDayData } from "@/features/day-data";
import { useSelectedDate } from "@/entities/select-date";

export function useMacrosData() {
  const selectedDateString = useSelectedDate(
    (state) => state.selectedDateString,
  );

  const { data: dayData, isLoading } = useDayData({
    date: selectedDateString,
  });

  const macros = useMemo(() => {
    if (!dayData?.meals) {
      return { protein: 0, fat: 0, carbs: 0 };
    }

    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbs = 0;

    for (const meal of dayData.meals) {
      if (meal.items) {
        for (const item of meal.items) {
          totalProtein += item.protein ?? 0;
          totalFat += item.fat ?? 0;
          totalCarbs += item.carbs ?? 0;
        }
      }
    }

    return {
      protein: Math.round(totalProtein * 10) / 10,
      fat: Math.round(totalFat * 10) / 10,
      carbs: Math.round(totalCarbs * 10) / 10,
    };
  }, [dayData]);

  return {
    ...macros,
    isLoading,
  };
}
