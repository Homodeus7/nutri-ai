"use client";

import { useState } from "react";
import { Card, CardContent } from "@/shared/ui/primitives/card";
import { Button } from "@/shared/ui/primitives/button";
import { UiText } from "@/shared/ui/ui-text";
import { useI18n } from "../i18n";

interface DayData {
  day: string;
  date: number;
}

interface DatePickerProps {
  days?: DayData[];
  initialSelectedIndex?: number;
  onDateChange?: (index: number) => void;
}

type TranslateFn = (key: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun") => string;

const getDefaultDays = (t: TranslateFn): DayData[] => [
  { day: t("mon"), date: 8 },
  { day: t("tue"), date: 9 },
  { day: t("wed"), date: 10 },
  { day: t("thu"), date: 11 },
  { day: t("fri"), date: 12 },
  { day: t("sat"), date: 13 },
  { day: t("sun"), date: 14 },
];

export function DatePicker({
  days,
  initialSelectedIndex = 3,
  onDateChange,
}: DatePickerProps) {
  const { t } = useI18n();
  const defaultDays = getDefaultDays(t);
  const daysToUse = days ?? defaultDays;
  const [selectedDate, setSelectedDate] = useState(initialSelectedIndex);

  const handleDateChange = (index: number) => {
    setSelectedDate(index);
    onDateChange?.(index);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center gap-2">
          {daysToUse.map((dayData, index) => (
            <Button
              key={dayData.day}
              onClick={() => handleDateChange(index)}
              variant="ghost"
              className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all flex-1 h-auto ${
                selectedDate === index
                  ? "bg-purple-500 text-white scale-105 shadow-lg hover:bg-purple-600"
                  : "hover:bg-muted text-foreground"
              }`}
            >
              <UiText variant="small" weight="semibold" as="span">
                {dayData.day}
              </UiText>
              <UiText variant="large" weight="bold" as="span">
                {dayData.date.toString().padStart(2, "0")}
              </UiText>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
