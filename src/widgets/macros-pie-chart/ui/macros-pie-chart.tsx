"use client";

import { useMemo } from "react";
import { Pie, PieChart, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/primitives/card";
import { ChartContainer, type ChartConfig } from "@/shared/ui/primitives/chart";
import { DataItem } from "@/widgets/calorie-tracker";
import { useIsMobile } from "@/shared/lib/use-media-query";
import type { MacrosPieChartProps, ChartDataItem } from "../model/types";
import { getChartDimensions } from "../lib/chart-config";
import { useI18n } from "../i18n";

const chartConfig = {
  value: {
    label: "Value",
  },
  protein: {
    label: "Protein",
    color: "var(--chart-1)",
  },
  fat: {
    label: "Fat",
    color: "var(--chart-2)",
  },
  carbs: {
    label: "Carbs",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function MacrosPieChart({ protein, fat, carbs }: MacrosPieChartProps) {
  const { t } = useI18n();
  const isMobile = useIsMobile();
  const dimensions = getChartDimensions(isMobile);

  const total = protein + fat + carbs;

  const chartData: ChartDataItem[] = useMemo(() => {
    if (total === 0) return [];

    return [
      {
        name: "protein",
        value: protein,
        fill: "var(--color-protein)",
      },
      {
        name: "fat",
        value: fat,
        fill: "var(--color-fat)",
      },
      {
        name: "carbs",
        value: carbs,
        fill: "var(--color-carbs)",
      },
    ];
  }, [protein, fat, carbs, total]);

  const percentages = useMemo(() => {
    if (total === 0) return { protein: 0, fat: 0, carbs: 0 };
    return {
      protein: Math.round((protein / total) * 100),
      fat: Math.round((fat / total) * 100),
      carbs: Math.round((carbs / total) * 100),
    };
  }, [protein, fat, carbs, total]);

  const dataItems = [
    {
      label: t("protein"),
      value: `${Math.round(protein)}g (${percentages.protein}%)`,
    },
    {
      label: t("fat"),
      value: `${Math.round(fat)}g (${percentages.fat}%)`,
    },
    {
      label: t("carbs"),
      value: `${Math.round(carbs)}g (${percentages.carbs}%)`,
    },
  ];

  if (total === 0) {
    return (
      <Card className="flex flex-col w-full">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px]">
          <p className="text-muted-foreground">{t("noData")}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col w-full">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-8 md:gap-4 items-center md:items-start">
          <div className="w-[180px] h-[180px] md:w-[230px] md:h-[230px] flex-shrink-0">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={dimensions.innerRadius}
                  outerRadius={dimensions.outerRadius}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `${value}g`,
                    t(name as "protein" | "fat" | "carbs"),
                  ]}
                />
              </PieChart>
            </ChartContainer>
          </div>

          <div className="flex-1 w-full flex justify-end items-center">
            <div className="space-y-3 w-full md:w-auto">
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
