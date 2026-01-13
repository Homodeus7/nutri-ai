import { cn } from "@/shared/lib/css";
import type { DataItemProps } from "../model/types";

export function DataItem({ label, value, isWarning }: DataItemProps) {
  return (
    <div className="space-y-1">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div
        className={cn(
          "text-lg md:text-xl font-bold",
          isWarning && "text-destructive",
        )}
      >
        {value}
      </div>
    </div>
  );
}
