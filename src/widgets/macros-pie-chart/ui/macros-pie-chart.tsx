"use client";

import { useMemo } from "react";
import { Pie, PieChart, Tooltip } from "recharts";
import { ChartContainer, type ChartConfig } from "@/shared/ui/primitives/chart";
import { ChartCard, ChartCardLayout, DataItem, DataItemCard } from "@/shared/ui";
import { useIsMobile } from "@/shared/lib/use-media-query";
import { useGoals, DEFAULT_PRESET } from "@/features/goals";
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

export function MacrosPieChart({
  protein,
  fat,
  carbs,
  variant = "side",
}: MacrosPieChartProps) {
  const { t } = useI18n();
  const isMobile = useIsMobile();
  const dimensions = getChartDimensions(isMobile);

  // Calculate calories from grams
  const proteinKcal = protein * KCAL_PER_GRAM.protein;
  const fatKcal = fat * KCAL_PER_GRAM.fat;
  const carbsKcal = carbs * KCAL_PER_GRAM.carbs;
  const totalKcal = proteinKcal + fatKcal + carbsKcal;

  const chartData: ChartDataItem[] = useMemo(() => {
    if (totalKcal === 0) {
      return [
        { name: "protein", value: 1, grams: 0, fill: "var(--color-protein)" },
        { name: "fat", value: 1, grams: 0, fill: "var(--color-fat)" },
        { name: "carbs", value: 1, grams: 0, fill: "var(--color-carbs)" },
      ];
    }

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

  const { data: userGoals } = useGoals();

  const goalPct = {
    protein: userGoals?.proteinPct ?? DEFAULT_PRESET.proteinPct,
    fat: userGoals?.fatPct ?? DEFAULT_PRESET.fatPct,
    carbs: userGoals?.carbsPct ?? DEFAULT_PRESET.carbsPct,
  };

  const macroItems = [
    {
      label: t("protein"),
      grams: protein,
      percent: percentages.protein,
      goalPct: goalPct.protein,
      color: "var(--chart-5)",
    },
    {
      label: t("fat"),
      grams: fat,
      percent: percentages.fat,
      goalPct: goalPct.fat,
      color: "var(--chart-3)",
    },
    {
      label: t("carbs"),
      grams: carbs,
      percent: percentages.carbs,
      goalPct: goalPct.carbs,
      color: "var(--chart-2)",
    },
  ];

  const chartNode = (
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
  );

  return (
    <ChartCard title={t("title")}>
      <ChartCardLayout
        variant={variant}
        className="md:gap-4"
        chartClassName="w-[180px] h-[180px] md:w-[230px] md:h-[230px]"
        dataClassName="w-full md:w-auto"
        chart={chartNode}
        data={
          variant === "bottom"
            ? macroItems.map((item) => (
                <DataItemCard
                  key={item.label}
                  label={item.label}
                  value={`${item.grams}${t("grams")}`}
                  subtitle={`${item.percent}%`}
                  color={item.color}
                />
              ))
            : macroItems.map((item) => {
                const diff = item.percent - item.goalPct;
                const isOver = diff > 0;
                return (
                  <DataItem
                    key={item.label}
                    label={item.label}
                    value={`${item.percent}%${diff !== 0 ? ` (${diff > 0 ? "+" : ""}${diff}%)` : ""}`}
                    isWarning={isOver}
                  />
                );
              })
        }
      />
    </ChartCard>
  );
}
