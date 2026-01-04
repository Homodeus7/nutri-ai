"use client";

import { Button } from "@/shared/ui/primitives/button";
import { UiText } from "@/shared/ui/ui-text";

interface DayButtonProps {
  day: string;
  date: Date;
  isSelected: boolean;
  onClick: () => void;
}

export function DayButton({ day, date, isSelected, onClick }: DayButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={isSelected ? "default" : "ghost"}
      className="flex flex-col text-foreground items-center gap-0.5 md:gap-2 p-1 md:p-3 rounded-lg md:rounded-xl transition-all flex-1 h-auto min-w-0"
    >
      <UiText
        variant="small"
        weight="semibold"
        as="span"
        className="text-[10px] md:text-xs"
      >
        {day}
      </UiText>
      <UiText
        variant="large"
        weight="bold"
        as="span"
        className="text-sm md:text-lg"
      >
        {date.getDate().toString().padStart(2, "0")}
      </UiText>
    </Button>
  );
}
