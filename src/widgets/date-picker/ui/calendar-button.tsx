"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/primitives/popover";
import { Calendar } from "@/shared/ui/primitives/calendar";
import { useLang } from "@/features/i18n";
import { useI18n } from "../i18n";

interface CalendarButtonProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

export function CalendarButton({
  selectedDate,
  onSelect,
}: CalendarButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const lang = useLang((state) => state.lang);
  const { t } = useI18n();

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onSelect(date);
      setIsOpen(false);
    }
  };

  const formattedDate = selectedDate.toLocaleDateString(lang, {
    day: "numeric",
    month: "long",
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full md:w-auto md:shrink-0 h-10 md:h-auto"
          aria-label="Open calendar"
        >
          <CalendarIcon className="size-4 md:size-5" />
          <span className="hidden md:flex ml-2">{t("calendar")}</span>
          <span className="md:hidden ml-2">{formattedDate}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
}
