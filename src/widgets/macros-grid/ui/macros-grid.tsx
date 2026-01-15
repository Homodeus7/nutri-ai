"use client";

import { useMemo } from "react";
import { MetricProgressCard } from "@/shared/ui/metric-card";
import { useAuthStore } from "@/entities/auth";
import {
  calculateGrams,
  DEFAULT_DAILY_KCAL,
  DEFAULT_PRESET,
} from "@/features/goals";
import { useI18n } from "../i18n";

export interface MacrosGridProps {
  protein: number;
  fat: number;
  carbs: number;
}

export function MacrosGrid({ protein, fat, carbs }: MacrosGridProps) {
  const { t } = useI18n();
  const user = useAuthStore((state) => state.user);

  const goals = useMemo(() => {
    const dailyKcal = user?.dailyKcalGoal ?? DEFAULT_DAILY_KCAL;
    const proteinPct = user?.proteinPct ?? DEFAULT_PRESET.proteinPct;
    const fatPct = user?.fatPct ?? DEFAULT_PRESET.fatPct;
    const carbsPct = user?.carbsPct ?? DEFAULT_PRESET.carbsPct;

    return calculateGrams(dailyKcal, proteinPct, fatPct, carbsPct);
  }, [user]);

  const macros = [
    { key: "protein", value: protein, total: goals.proteinGrams },
    { key: "fat", value: fat, total: goals.fatGrams },
    { key: "carbs", value: carbs, total: goals.carbsGrams },
    { key: "fiber", value: 18, total: 25 },
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
