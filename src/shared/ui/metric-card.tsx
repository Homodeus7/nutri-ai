"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/ui/primitives/card";
import { Progress } from "@/shared/ui/primitives/progress";
import { cn } from "@/shared/lib/css";

interface MetricValueProps {
  value: number | string;
  unit?: string;
}

function MetricValue({ value, unit }: MetricValueProps) {
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-xl md:text-2xl font-bold leading-none">
        {value}
      </span>
      {unit && (
        <span className="text-sm font-medium text-muted-foreground">{unit}</span>
      )}
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
}

export function MetricCard({
  label,
  value,
  unit,
  subtext,
  icon,
  className,
}: MetricCardProps) {
  return (
    <Card className={cn("hover:shadow-md", className)}>
      <CardHeader className="flex-row justify-between items-start">
        <CardTitle className="text-sm font-semibold">
          {label}
        </CardTitle>
        {icon && <span className="text-xl sm:text-2xl">{icon}</span>}
      </CardHeader>
      <CardContent>
        <MetricValue value={value} unit={unit} />
        {subtext && (
          <CardDescription className="mt-1 leading-tight">
            {subtext}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}

interface MetricProgressCardProps {
  label: string;
  value: number | string;
  total: number;
  unit?: string;
  goalLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function MetricProgressCard({
  label,
  value,
  total,
  unit,
  goalLabel = "Goal",
  icon,
  className,
}: MetricProgressCardProps) {
  const numericValue =
    typeof value === "number" ? value : parseFloat(String(value)) || 0;

  return (
    <Card className={cn("hover:shadow-md", className)}>
      <CardHeader className="flex-row justify-between items-start">
        <CardTitle className="text-sm font-semibold">
          {label}
        </CardTitle>
        {icon && <span className="text-xl sm:text-2xl">{icon}</span>}
      </CardHeader>
      <CardContent className="space-y-3">
        <MetricValue value={value} unit={unit} />
        <Progress value={Math.min(Math.max((numericValue / total) * 100, 0), 100)} />
        <div className="flex justify-between items-center text-muted-foreground">
          <span className="text-xs">
            {goalLabel}: {total}
            {unit}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
