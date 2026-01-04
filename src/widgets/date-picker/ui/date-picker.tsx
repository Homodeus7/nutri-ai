"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/shared/ui/primitives/card";
import { useI18n } from "../i18n";
import { useSelectedDate } from "@/features/day-data";
import { CalendarButton } from "./calendar-button";
import { DayButton } from "./day-button";

interface DayData {
  day: string;
  date: Date;
}

interface DatePickerProps {
  onDateChange?: (date: Date) => void;
}

type TranslateFn = (
  key: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun",
) => string;

const getWeekStart = (date: Date): Date => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Adjust when day is Sunday
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
};

const generateWeekDays = (date: Date, t: TranslateFn): DayData[] => {
  const weekStart = getWeekStart(date);
  const days: DayData[] = [];
  const dayKeys: Array<"mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"> =
    ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(weekStart);
    currentDay.setDate(weekStart.getDate() + i);
    days.push({
      day: t(dayKeys[i]),
      date: currentDay,
    });
  }

  return days;
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export function DatePicker({ onDateChange }: DatePickerProps) {
  const { t } = useI18n();
  const selectedDate = useSelectedDate((state) => state.selectedDate);
  const setDate = useSelectedDate((state) => state.setDate);

  const weekDays = useMemo(
    () => generateWeekDays(selectedDate, t),
    [selectedDate, t],
  );

  const handleDayClick = (date: Date) => {
    setDate(date);
    onDateChange?.(date);
  };

  const handleCalendarSelect = (date: Date) => {
    setDate(date);
    onDateChange?.(date);
  };

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-2">
          <div className="md:hidden">
            <CalendarButton
              selectedDate={selectedDate}
              onSelect={handleCalendarSelect}
            />
          </div>

          <div className="flex flex-1 justify-between items-center gap-1 md:gap-2">
            {weekDays.map((dayData) => (
              <DayButton
                key={dayData.date.toISOString()}
                day={dayData.day}
                date={dayData.date}
                isSelected={isSameDay(dayData.date, selectedDate)}
                onClick={() => handleDayClick(dayData.date)}
              />
            ))}
          </div>

          <div className="hidden md:block">
            <CalendarButton
              selectedDate={selectedDate}
              onSelect={handleCalendarSelect}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
