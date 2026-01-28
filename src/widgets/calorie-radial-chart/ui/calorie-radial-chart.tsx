"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartContainer, type ChartConfig } from "@/shared/ui/primitives/chart";
import { ChartCard, ChartCardLayout, DataItem } from "@/shared/ui";
import { useIsMobile } from "@/shared/lib/use-media-query";
import { cn } from "@/shared/lib/css";
import { calculateCalorieMetrics } from "../lib/calorie-calculations";
import { getChartDimensions } from "../lib/chart-config";
import type { CalorieRadialChartProps, ChartDataItem } from "../model/types";
import { useI18n } from "../i18n";

const chartConfig = {} satisfies ChartConfig;

export function CalorieRadialChart({
  caloriesRemaining,
  caloriesTotal,
}: CalorieRadialChartProps) {
  const { t } = useI18n();
  const isMobile = useIsMobile();

  const metrics = calculateCalorieMetrics(caloriesTotal, caloriesRemaining);
  const dimensions = getChartDimensions(isMobile);

  const chartData: ChartDataItem[] = [
    {
      name: "consumed",
      calories: metrics.consumed,
      fill: metrics.isOverGoal ? "var(--destructive)" : "var(--primary)",
    },
  ];

  const centerLabel = {
    value: metrics.displayValue,
    text: metrics.isOverGoal ? t("over") : t("left"),
    isWarning: metrics.isOverGoal,
  };

  const dataItems = [
    {
      label: t("remaining"),
      value: `${metrics.remaining} ${t("unit")}`,
      isWarning: metrics.isOverGoal,
    },
    {
      label: t("consumed"),
      value: `${metrics.consumed} ${t("unit")}`,
    },
    {
      label: t("percentOfGoal"),
      value: `${metrics.percentage} %`,
      isWarning: metrics.percentage > 100,
    },
    {
      label: t("goal"),
      value: `${metrics.total} ${t("unit")}`,
    },
  ];

  return (
    <ChartCard title={t("title")}>
      <ChartCardLayout
        chartClassName="w-[180px] h-[180px] md:w-[240px] md:h-[240px]"
        chart={
          <ChartContainer config={chartConfig} className="w-full h-full">
            <RadialBarChart
              data={chartData}
              startAngle={90}
              endAngle={metrics.endAngle}
              innerRadius={dimensions.innerRadius}
              outerRadius={dimensions.outerRadius}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={dimensions.polarRadius}
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
                            className={cn(
                              "text-lg md:text-2xl font-bold",
                              centerLabel.isWarning
                                ? "fill-destructive"
                                : "fill-foreground",
                            )}
                          >
                            {centerLabel.value}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + dimensions.labelOffset}
                            className="fill-muted-foreground text-xs md:text-sm"
                          >
                            {centerLabel.text}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        }
        data={dataItems.map((item) => (
          <DataItem key={item.label} {...item} />
        ))}
      />
    </ChartCard>
  );
}
