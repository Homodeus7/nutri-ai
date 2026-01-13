"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/primitives/card";
import { useI18n } from "../i18n";
import { useSelectedDate } from "@/features/day-data";
import { CalendarButton } from "./calendar-button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayButton } from "./day-button";
import { Button } from "@/shared/ui/primitives/button";
import {
  generateWeekDays,
  isSameDay,
  formatMonthYear,
} from "../lib/date-utils";
import { useWeekNavigation } from "../model/use-week-navigation";

interface DatePickerProps {
  onDateChange?: (date: Date) => void;
}

export function DatePicker({ onDateChange }: DatePickerProps) {
  const { t } = useI18n();
  const selectedDate = useSelectedDate((state) => state.selectedDate);
  const setDate = useSelectedDate((state) => state.setDate);

  const weekDays = useMemo(
    () => generateWeekDays(selectedDate, t),
    [selectedDate, t],
  );

  const currentMonthYear = useMemo(
    () => formatMonthYear(selectedDate, t),
    [selectedDate, t],
  );

  const { handlePrevWeek, handleNextWeek } = useWeekNavigation({
    selectedDate,
    onDateChange,
    setDate,
  });

  const handleDayClick = (date: Date) => {
    setDate(date);
    onDateChange?.(date);
  };

  const handleCalendarSelect = (date: Date) => {
    setDate(date);
    onDateChange?.(date);
  };

  return (
    <>
      {/* Mobile: only calendar button */}
      <div className="md:hidden">
        <CalendarButton
          selectedDate={selectedDate}
          onSelect={handleCalendarSelect}
        />
      </div>

      {/* Desktop: card with week days */}
      <Card className="hidden md:block">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl">{currentMonthYear}</CardTitle>
              <Button variant="ghost" size="icon-sm" onClick={handlePrevWeek}>
                <ChevronLeft className="size-4 md:size-5" />
              </Button>
              <Button variant="ghost" size="icon-sm" onClick={handleNextWeek}>
                <ChevronRight className="size-4 md:size-5" />
              </Button>
            </div>
            <CalendarButton
              selectedDate={selectedDate}
              onSelect={handleCalendarSelect}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="flex w-full justify-between items-center gap-2">
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
          </div>
        </CardContent>
      </Card>
    </>
  );
}
