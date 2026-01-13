import { useCallback } from "react";
import { addWeeks } from "../lib/date-utils";

interface UseWeekNavigationProps {
  selectedDate: Date;
  onDateChange?: (date: Date) => void;
  setDate: (date: Date) => void;
}

export const useWeekNavigation = ({
  selectedDate,
  onDateChange,
  setDate,
}: UseWeekNavigationProps) => {
  const navigateWeek = useCallback(
    (direction: "prev" | "next") => {
      const weeksToAdd = direction === "prev" ? -1 : 1;
      const newDate = addWeeks(selectedDate, weeksToAdd);
      setDate(newDate);
      onDateChange?.(newDate);
    },
    [selectedDate, setDate, onDateChange],
  );

  const handlePrevWeek = useCallback(() => {
    navigateWeek("prev");
  }, [navigateWeek]);

  const handleNextWeek = useCallback(() => {
    navigateWeek("next");
  }, [navigateWeek]);

  return {
    handlePrevWeek,
    handleNextWeek,
  };
};
