"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { ChartContainer, type ChartConfig } from "@/shared/ui/primitives/chart";
import { useI18n } from "../i18n";
import { cn } from "@/shared/lib/css";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/primitives/card";
import { useIsMobile } from "@/shared/lib/use-media-query";

interface CalorieTrackerProps {
  caloriesRemaining: number;
  caloriesTotal: number;
}

const chartConfig = {
  calories: {
    label: "Calories",
  },
  consumed: {
    label: "Consumed",
    color: "hsl(var(--primary-foreground))",
  },
} satisfies ChartConfig;

interface DataItemProps {
  label: string;
  value: string | number;
  isWarning?: boolean;
}

function DataItem({ label, value, isWarning }: DataItemProps) {
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

export function CalorieTracker({
  caloriesRemaining,
  caloriesTotal,
}: CalorieTrackerProps) {
  const { t } = useI18n();
  const isMobile = useIsMobile();

  const caloriesConsumed = caloriesTotal - caloriesRemaining;
  const isOverGoal = caloriesRemaining < 0;
  const percentage = Math.round((caloriesConsumed / caloriesTotal) * 100);

  const displayValue = Math.abs(caloriesRemaining);
  const cappedPercentage = Math.min(percentage, 100);
  const endAngle = 90 - (cappedPercentage / 100) * 360;

  const innerRadius = isMobile ? 50 : 97;
  const outerRadius = isMobile ? 100 : 169;
  const polarRadius: [number, number] = isMobile ? [56, 44] : [105, 89];
  const labelOffset = isMobile ? 18 : 26;

  const chartData = [
    {
      name: "consumed",
      calories: caloriesConsumed,
      fill: isOverGoal ? "hsl(var(--destructive))" : "var(--primary)",
    },
  ];

  const dataItems = [
    {
      label: t("remaining"),
      value: `${caloriesRemaining} ${t("unit")}`,
      isWarning: isOverGoal,
    },
    {
      label: t("consumed"),
      value: `${caloriesConsumed} ${t("unit")}`,
    },
    {
      label: t("percentOfGoal"),
      value: `${percentage}%`,
      isWarning: percentage > 100,
    },
    {
      label: t("goal"),
      value: `${caloriesTotal} ${t("unit")}`,
    },
  ];

  return (
    <Card className="flex flex-col w-full">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-[160px] h-[160px] md:w-[240px] md:h-[240px] flex-shrink-0">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <RadialBarChart
                data={chartData}
                startAngle={90}
                endAngle={endAngle}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-background"
                  polarRadius={polarRadius}
                />
                <RadialBar dataKey="calories" background />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-lg md:text-2xl font-bold"
                            >
                              {displayValue}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + labelOffset}
                              className="fill-muted-foreground text-xs md:text-sm"
                            >
                              {isOverGoal ? t("over") : t("left")}
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </div>

          <div className="flex-1 w-full flex justify-end items-center">
            <div className="space-y-3 w-full md:w-auto md:min-w-[200px]">
              {dataItems.map((item) => (
                <DataItem key={item.label} {...item} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
