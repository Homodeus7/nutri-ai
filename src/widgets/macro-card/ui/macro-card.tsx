"use client";

import { Card, CardContent } from "@/shared/ui/primitives/card";
import { UiText } from "@/shared/ui/ui-text";
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
  const percentage = (current / total) * 100;

  return (
    <Card className={`${bgColor} text-black border-0`}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <UiText variant="large" weight="bold">
            {label}
          </UiText>
          <span className="text-2xl">{icon}</span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="h-2 bg-black/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-black/60 transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <UiText variant="small" weight="semibold" className="opacity-75">
              {t("current")}
            </UiText>
            <UiText variant="h3" weight="bold">
              {current}
              {unit}
            </UiText>
          </div>
          <div className="text-right">
            <UiText variant="small" weight="semibold" className="opacity-75">
              {t("goal")}
            </UiText>
            <UiText variant="h4" weight="bold">
              {total}
              {unit}
            </UiText>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
