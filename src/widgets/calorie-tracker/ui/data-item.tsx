import { cn } from "@/shared/lib/css";
import type { DataItemProps } from "../model/types";

export function DataItem({ label, value, isWarning, color }: DataItemProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {label}
      </div>
      <div
        className={cn(
          "text-lg md:text-xl font-bold flex gap-2 items-center",
          isWarning && "text-destructive",
          color && "md:text-base",
        )}
      >
        {color && (
          <span
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
        )}{" "}
        {value}
      </div>
    </div>
  );
}
