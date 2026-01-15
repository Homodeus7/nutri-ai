"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/primitives/card";
import { useIsMobile } from "@/shared/lib/use-media-query";
import { calculateCalorieMetrics } from "../lib/calorie-calculations";
import { getChartDimensions } from "../lib/chart-config";
import type { CalorieTrackerProps, ChartDataItem } from "../model/types";
import { DataItem } from "./data-item";
import { CalorieChart } from "./calorie-chart";
import { useI18n } from "../i18n";

export function CalorieTracker({
  caloriesRemaining,
  caloriesTotal,
}: CalorieTrackerProps) {
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
      value: `${metrics.percentage}%`,
      isWarning: metrics.percentage > 100,
    },
    {
      label: t("goal"),
      value: `${metrics.total} ${t("unit")}`,
    },
  ];

  return (
    <Card className="flex flex-col w-full">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-8 items-center md:items-start">
          <div className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] flex-shrink-0">
            <CalorieChart
              data={chartData}
              endAngle={metrics.endAngle}
              dimensions={dimensions}
              centerLabel={{
                value: metrics.displayValue,
                text: metrics.isOverGoal ? t("over") : t("left"),
                isWarning: metrics.isOverGoal,
              }}
            />
          </div>

          <div className="flex-1 w-full flex justify-end items-center">
            <div className="space-y-3">
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
