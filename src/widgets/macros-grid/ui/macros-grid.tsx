"use client";

import { MetricProgressCard } from "@/shared/ui/metric-card";
import {
  calculateGrams,
  DEFAULT_DAILY_KCAL,
  DEFAULT_PRESET,
  useGoals,
} from "@/features/goals";
import { useI18n } from "../i18n";

const DEFAULT_FIBER_GOAL = 25;

export interface MacrosGridProps {
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
}

export function MacrosGrid({ protein, fat, carbs, fiber }: MacrosGridProps) {
  const { t } = useI18n();
  const { data: userGoals } = useGoals();

  const fallbackGrams = calculateGrams(
    DEFAULT_DAILY_KCAL,
    DEFAULT_PRESET.proteinPct,
    DEFAULT_PRESET.fatPct,
    DEFAULT_PRESET.carbsPct,
  );

  const goals = {
    proteinGrams: userGoals?.proteinGrams ?? fallbackGrams.proteinGrams,
    fatGrams: userGoals?.fatGrams ?? fallbackGrams.fatGrams,
    carbsGrams: userGoals?.carbsGrams ?? fallbackGrams.carbsGrams,
  };

  const macros = [
    { key: "protein", value: protein, total: goals.proteinGrams },
    { key: "fat", value: fat, total: goals.fatGrams },
    { key: "carbs", value: carbs, total: goals.carbsGrams },
    { key: "fiber", value: fiber, total: DEFAULT_FIBER_GOAL },
  ] as const;

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      {macros.map((macro) => (
        <MetricProgressCard
          key={macro.key}
          label={t(macro.key)}
          value={Math.round(macro.value)}
          total={macro.total}
          unit="g"
          goalLabel={t("goal")}
        />
      ))}
    </div>
  );
}
