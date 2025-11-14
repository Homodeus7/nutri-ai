"use client";

import { Card, CardContent } from "@/shared/ui/primitives/card";
import { UiText } from "@/shared/ui/ui-text";
import { useI18n } from "../i18n";

interface StatCardProps {
  label: string;
  value: string;
  goal: string;
  bgColor: string;
  t: (key: string, params?: Record<string, string>) => string;
}

function StatCard({ label, value, goal, bgColor, t }: StatCardProps) {
  return (
    <Card className={`${bgColor} text-black border-0`}>
      <CardContent className="pt-6">
        <UiText variant="small" weight="semibold" className="mb-2">
          {label}
        </UiText>
        <UiText variant="h3" weight="bold">
          {value}
        </UiText>
        <UiText variant="muted" className="mt-2 opacity-75 text-black">
          {t("ofGoal", { goal })}
        </UiText>
      </CardContent>
    </Card>
  );
}

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
      <StatCard
        label={t("waterIntake")}
        value={waterIntake}
        goal={waterGoal}
        bgColor="bg-yellow-300"
        t={t}
      />
      <StatCard
        label={t("steps")}
        value={steps}
        goal={stepsGoal}
        bgColor="bg-green-400"
        t={t}
      />
    </>
  );
}
