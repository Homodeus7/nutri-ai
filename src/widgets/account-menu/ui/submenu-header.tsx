"use client";

import { ArrowLeft } from "lucide-react";
import { DropdownMenuLabel } from "@/shared/ui/primitives/dropdown-menu";

interface SubmenuHeaderProps {
  title: string;
  onBack: () => void;
}

export function SubmenuHeader({ title, onBack }: SubmenuHeaderProps) {
  return (
    <DropdownMenuLabel asChild>
      <button
        onClick={onBack}
        className="flex items-center gap-2 w-full hover:bg-accent rounded-sm transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{title}</span>
      </button>
    </DropdownMenuLabel>
  );
}
