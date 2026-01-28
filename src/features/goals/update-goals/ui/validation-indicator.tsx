"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/shared/lib/css";

interface ValidationIndicatorProps {
  sum: number;
  isValid: boolean;
  validMessage: string;
  invalidMessage: string;
}

export function ValidationIndicator({
  sum,
  isValid,
  validMessage,
  invalidMessage,
}: ValidationIndicatorProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 rounded-xl border transition-colors",
        isValid
          ? "bg-green-500/10 border-green-500/20"
          : "bg-red-500/10 border-red-500/20",
      )}
    >
      <div className="flex items-center gap-3">
        {isValid ? (
          <CheckCircle2 className="text-green-500" size={20} />
        ) : (
          <AlertCircle className="text-red-500" size={20} />
        )}
        <span
          className={cn(
            "text-sm font-medium",
            isValid ? "text-green-200" : "text-red-200",
          )}
        >
          {isValid ? validMessage : invalidMessage}
        </span>
      </div>
      <span
        className={cn(
          "text-lg font-bold",
          isValid ? "text-green-400" : "text-red-400",
        )}
      >
        {sum}%
      </span>
    </div>
  );
}
