"use client";

import { useMemo, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/primitives/card";
import { Button } from "@/shared/ui/primitives/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/primitives/popover";
import { Calendar } from "@/shared/ui/primitives/calendar";
import { UiText } from "@/shared/ui/ui-text";
import { useI18n } from "../i18n";
import { useSelectedDate } from "@/features/day-data";

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
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const weekDays = useMemo(
    () => generateWeekDays(selectedDate, t),
    [selectedDate, t],
  );

  const handleDayClick = (date: Date) => {
    setDate(date);
    onDateChange?.(date);
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      onDateChange?.(date);
      setIsCalendarOpen(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 justify-between items-center gap-2">
            {weekDays.map((dayData) => {
              const isSelected = isSameDay(dayData.date, selectedDate);
              return (
                <Button
                  key={dayData.date.toISOString()}
                  onClick={() => handleDayClick(dayData.date)}
                  variant={isSelected ? "default" : "ghost"}
                  className="flex flex-col text-foreground items-center gap-2 p-3 rounded-xl transition-all flex-1 h-auto"
                >
                  <UiText variant="small" weight="semibold" as="span">
                    {dayData.day}
                  </UiText>
                  <UiText variant="large" weight="bold" as="span">
                    {dayData.date.getDate().toString().padStart(2, "0")}
                  </UiText>
                </Button>
              );
            })}
          </div>

          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 h-auto p-3 w-12"
                aria-label="Open calendar"
              >
                <CalendarIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleCalendarSelect}
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
}
