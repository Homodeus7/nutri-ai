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

const KCAL_PER_GRAM = { protein: 4, fat: 9, carbs: 4 } as const;

export function MacrosPieChart({ protein, fat, carbs }: MacrosPieChartProps) {
  const { t } = useI18n();
  const isMobile = useIsMobile();
  const dimensions = getChartDimensions(isMobile);

  // Calculate calories from grams
  const proteinKcal = protein * KCAL_PER_GRAM.protein;
  const fatKcal = fat * KCAL_PER_GRAM.fat;
  const carbsKcal = carbs * KCAL_PER_GRAM.carbs;
  const totalKcal = proteinKcal + fatKcal + carbsKcal;

  const chartData: ChartDataItem[] = useMemo(() => {
    if (totalKcal === 0) return [];

    // Use calories for chart proportions, keep grams for tooltip
    return [
      {
        name: "protein",
        value: proteinKcal,
        grams: protein,
        fill: "var(--color-protein)",
      },
      {
        name: "fat",
        value: fatKcal,
        grams: fat,
        fill: "var(--color-fat)",
      },
      {
        name: "carbs",
        value: carbsKcal,
        grams: carbs,
        fill: "var(--color-carbs)",
      },
    ];
  }, [proteinKcal, fatKcal, carbsKcal, totalKcal, protein, fat, carbs]);

  const percentages = useMemo(() => {
    if (totalKcal === 0) return { protein: 0, fat: 0, carbs: 0 };
    return {
      protein: Math.round((proteinKcal / totalKcal) * 100),
      fat: Math.round((fatKcal / totalKcal) * 100),
      carbs: Math.round((carbsKcal / totalKcal) * 100),
    };
  }, [proteinKcal, fatKcal, carbsKcal, totalKcal]);

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

  if (totalKcal === 0) {
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
                formatter={(_, name: string, props) => [
                  `${props.payload.grams}g`,
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
