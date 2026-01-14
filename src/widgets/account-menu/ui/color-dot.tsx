"use client";

import { cn } from "@/shared/lib/css";

type ColorTheme =
  | "orange"
  | "blue"
  | "green"
  | "red"
  | "purple"
  | "pink"
  | "yellow";

const COLOR_CLASSES: Record<ColorTheme, string> = {
  orange: "bg-orange-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  yellow: "bg-yellow-500",
};

interface ColorDotProps {
  color: ColorTheme;
  className?: string;
}

export function ColorDot({ color, className }: ColorDotProps) {
  return (
    <span
      className={cn("w-4 h-4 rounded-full shrink-0", COLOR_CLASSES[color], className)}
      aria-hidden="true"
    />
  );
}
