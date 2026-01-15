"use client";

import { useMemo } from "react";
import { Pie, PieChart, Tooltip } from "recharts";
import { CardContent } from "@/shared/ui/primitives/card";
import { ChartContainer, type ChartConfig } from "@/shared/ui/primitives/chart";
import { ChartCard, ChartCardLayout, DataItem } from "@/shared/ui";
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
    color: "var(--chart-5)",
  },
  fat: {
    label: "Fat",
    color: "var(--chart-3)",
  },
  carbs: {
    label: "Carbs",
    color: "var(--chart-2)",
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
      value: `${percentages.protein}%`,
    },
    {
      label: t("fat"),
      value: `${percentages.fat}%`,
    },
    {
      label: t("carbs"),
      value: `${percentages.carbs}%`,
    },
  ];

  if (total === 0) {
    return (
      <ChartCard title={t("title")}>
        <CardContent className="flex items-center justify-center h-[200px] p-0">
          <p className="text-muted-foreground">{t("noData")}</p>
        </CardContent>
      </ChartCard>
    );
  }

  return (
    <ChartCard title={t("title")}>
      <ChartCardLayout
        className="md:gap-4"
        chartClassName="w-[180px] h-[180px] md:w-[230px] md:h-[230px]"
        dataClassName="w-full md:w-auto"
        chart={
          <ChartContainer config={chartConfig} className="w-full h-full">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={dimensions.innerRadius}
                outerRadius={dimensions.outerRadius}
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
        }
        data={dataItems.map((item) => (
          <DataItem key={item.label} {...item} />
        ))}
      />
    </ChartCard>
  );
}
