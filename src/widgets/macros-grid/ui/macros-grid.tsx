"use client";

import { MetricProgressCard } from "@/shared/ui/metric-card";
import { useI18n } from "../i18n";

const MACROS = [
  { key: "carbs", value: 140, total: 200 },
  { key: "protein", value: 60, total: 120 },
  { key: "fat", value: 45, total: 65 },
  { key: "fiber", value: 18, total: 25 },
] as const;

export function MacrosGrid() {
  const { t } = useI18n();

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      {MACROS.map((macro) => (
        <MetricProgressCard
          key={macro.key}
          label={t(macro.key)}
          value={macro.value}
          total={macro.total}
          unit="g"
          goalLabel={t("goal")}
        />
      ))}
    </div>
  );
}
