"use client";

import { type ColorTheme } from "@/features/theme";
import { cn } from "@/shared/lib/css";

const COLOR_CLASSES: Record<ColorTheme, string> = {
  orange: "bg-orange",
  blue: "bg-blue",
  green: "bg-green",
  red: "bg-red",
  purple: "bg-purple",
  pink: "bg-pink",
  yellow: "bg-yellow",
};

interface ColorDotProps {
  color: ColorTheme;
  className?: string;
}

export function ColorDot({ color, className }: ColorDotProps) {
  return (
    <span
      className={cn(
        "w-4 h-4 rounded-full shrink-0",
        COLOR_CLASSES[color],
        className,
      )}
      aria-hidden="true"
    />
  );
}
