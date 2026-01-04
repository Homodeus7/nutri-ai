"use client";

import { MetricCard } from "@/shared/ui/metric-card";
import { useI18n } from "../i18n";



interface StatsGridProps {
  waterIntake: string;
  waterGoal: string;
  steps: string;
  stepsGoal: string;
}

export function StatsGrid({
  waterIntake,
  waterGoal,
  steps,
  stepsGoal,
}: StatsGridProps) {
  const { t } = useI18n();

  return (
    <>
      <MetricCard
        label={t("waterIntake")}
        value={waterIntake}
        bgColor="bg-yellow-300"
        subtext={t("ofGoal", { goal: waterGoal })}
      />
      <MetricCard
        label={t("steps")}
        value={steps}
        bgColor="bg-green-400"
        subtext={t("ofGoal", { goal: stepsGoal })}
      />
    </>
  );
}
