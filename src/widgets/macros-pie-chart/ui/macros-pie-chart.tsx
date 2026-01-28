"use client";

import { useMemo } from "react";
import { Pie, PieChart, Tooltip } from "recharts";
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

  const macroItems = [
    {
      label: t("protein"),
      grams: protein,
      percent: percentages.protein,
      color: "var(--chart-5)",
    },
    {
      label: t("fat"),
      grams: fat,
      percent: percentages.fat,
      color: "var(--chart-3)",
    },
    {
      label: t("carbs"),
      grams: carbs,
      percent: percentages.carbs,
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
                <div
                  key={item.label}
                  className="bg-muted/50 rounded-xl p-3 text-center border border-border/50"
                >
                  <div
                    className="w-2 h-2 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    {item.label}
                  </div>
                  <div className="font-bold text-lg">
                    {item.grams}
                    {t("grams")}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono">
                    {item.percent}%
                  </div>
                </div>
              ))
            : macroItems.map((item) => (
                <DataItem
                  key={item.label}
                  label={item.label}
                  value={`${item.percent}%`}
                />
              ))
        }
      />
    </ChartCard>
  );
}
