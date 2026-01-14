"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { DropdownMenuItem } from "@/shared/ui/primitives/dropdown-menu";

interface MenuItemLinkProps {
  icon: LucideIcon;
  label: string;
  value?: string;
  onClick: () => void;
  disabled?: boolean;
}

export function MenuItemLink({
  icon: Icon,
  label,
  value,
  onClick,
  disabled = false,
}: MenuItemLinkProps) {
  return (
    <DropdownMenuItem
      disabled={disabled}
      onSelect={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="justify-between"
    >
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <span>
          {label}
          {value && `: ${value}`}
        </span>
      </div>
      <ChevronRight className="w-4 h-4" />
    </DropdownMenuItem>
  );
}
