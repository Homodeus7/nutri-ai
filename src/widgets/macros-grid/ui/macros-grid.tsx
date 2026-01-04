"use client";

import { MetricProgressCard } from "@/shared/ui/metric-card";
import { useI18n } from "../i18n";

const MACROS = [
  { key: "carbs", value: 140, total: 200, bgColor: "bg-yellow-300" },
  { key: "protein", value: 60, total: 120, bgColor: "bg-green-400" },
  { key: "fat", value: 45, total: 65, bgColor: "bg-orange-400" },
  { key: "fiber", value: 18, total: 25, bgColor: "bg-purple-400" },
] as const;

export function MacrosGrid() {
  const { t } = useI18n();

  return (
    <div className="w-full grid grid-cols-2 gap-4 md:gap-6">
      {MACROS.map((macro) => (
        <MetricProgressCard
          key={macro.key}
          label={t(macro.key)}
          value={macro.value}
          total={macro.total}
          unit="g"
          bgColor={macro.bgColor}
          subtext={t("current")}
        />
      ))}
    </div>
  );
}
