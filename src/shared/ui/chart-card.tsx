import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/ui/primitives/card";
import { cn } from "@/shared/lib/css";

export interface ChartCardProps
  extends Omit<React.ComponentProps<typeof Card>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
}

export function ChartCard({
  title,
  description,
  children,
  className,
  ...props
}: ChartCardProps) {
  return (
    <Card className={cn("flex flex-col w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export interface ChartCardLayoutProps {
  chart: React.ReactNode;
  chartClassName?: string;
  data: React.ReactNode;
  dataClassName?: string;
  className?: string;
}

export function ChartCardLayout({
  chart,
  chartClassName,
  data,
  dataClassName,
  className,
}: ChartCardLayoutProps) {
  return (
    <div
      className={cn("flex gap-8 items-center md:items-start", className)}
    >
      <div className={cn("flex-shrink-0", chartClassName)}>{chart}</div>
      <div
        className={cn(
          "flex-1 w-full flex justify-end items-center",
          dataClassName,
        )}
      >
        <div className="space-y-3">{data}</div>
      </div>
    </div>
  );
}
