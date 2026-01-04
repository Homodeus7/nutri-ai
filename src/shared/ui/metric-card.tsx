"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/ui/primitives/card";
import { cn } from "@/shared/lib/css";

interface MetricValueProps {
  value: number | string;
  unit?: string;
}

function MetricValue({ value, unit }: MetricValueProps) {
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-xl md:text-2xl font-bold text-black leading-none">
        {value}
      </span>
      {unit && (
        <span className="text-sm font-medium text-black/60">{unit}</span>
      )}
    </div>
  );
}

interface ProgressBarProps {
  value: number;
  max: number;
}

function ProgressBar({ value, max }: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="h-2 bg-black/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-black/70 transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: number | string;
  unit?: string;
  subtext?: string;
  icon?: React.ReactNode;
  className?: string;
  bgColor?: string;
}

export function MetricCard({
  label,
  value,
  unit,
  subtext,
  icon,
  className,
  bgColor = "bg-card",
}: MetricCardProps) {
  return (
    <Card
      className={cn("border-0 py-0 gap-0 hover:shadow-md", bgColor, className)}
    >
      <CardHeader className="p-4 pb-0 sm:p-5 sm:pb-0 flex-row justify-between items-start">
        <CardTitle className="text-sm font-semibold text-black/70">
          {label}
        </CardTitle>
        {icon && <span className="text-xl sm:text-2xl opacity-90">{icon}</span>}
      </CardHeader>
      <CardContent className="p-4 pt-2 sm:p-5 sm:pt-2">
        <MetricValue value={value} unit={unit} />
        {subtext && (
          <CardDescription className="text-black/50 mt-1 leading-tight">
            {subtext}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}

interface MetricProgressCardProps extends MetricCardProps {
  total: number;
}

export function MetricProgressCard({
  label,
  value,
  total,
  unit,
  subtext,
  icon,
  className,
  bgColor = "bg-card",
}: MetricProgressCardProps) {
  const numericValue =
    typeof value === "number" ? value : parseFloat(String(value)) || 0;

  return (
    <Card
      className={cn("border-0 py-0 gap-0 hover:shadow-md", bgColor, className)}
    >
      <CardHeader className="p-4 pb-0 sm:p-5 sm:pb-0 flex-row justify-between items-start">
        <CardTitle className="text-sm font-semibold text-black/70">
          {label}
        </CardTitle>
        {icon && <span className="text-xl sm:text-2xl opacity-90">{icon}</span>}
      </CardHeader>
      <CardContent className="p-4 pt-2 sm:p-5 sm:pt-2 space-y-3">
        <MetricValue value={value} unit={unit} />
        <ProgressBar value={numericValue} max={total} />
        <div className="flex justify-between items-end text-black/60">
          <span className="text-xs">
            {subtext}: {total}
            {unit}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
