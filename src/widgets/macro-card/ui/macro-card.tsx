"use client";

import { MetricCard } from "@/shared/ui/metric-card";
import { useI18n } from "../i18n";

interface MacroCardProps {
  label: string;
  current: number;
  total: number;
  unit: string;
  bgColor: string;
  icon: string;
}

export function MacroCard({
  label,
  current,
  total,
  unit,
  bgColor,
  icon,
}: MacroCardProps) {
  const { t } = useI18n();

  return (
    <MetricCard
      label={label}
      value={current}
      total={total}
      unit={unit}
      icon={icon}
      bgColor={bgColor}
      progressBar={true}
      subtext={t("current")}
    />
  );
}
