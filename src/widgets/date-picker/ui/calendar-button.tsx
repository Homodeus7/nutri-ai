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

interface CalendarButtonProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

export function CalendarButton({ selectedDate, onSelect }: CalendarButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onSelect(date);
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full md:w-auto md:shrink-0 h-10 md:h-auto md:p-3 md:w-12"
          aria-label="Open calendar"
        >
          <CalendarIcon className="size-4 md:size-5" />
          <span className="md:hidden ml-2">Календарь</span>
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
