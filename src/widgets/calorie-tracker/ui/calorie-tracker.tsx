"use client";

import { UiText } from "@/shared/ui/ui-text";
import { useI18n } from "../i18n";

interface CalorieTrackerProps {
  caloriesRemaining: number;
  caloriesTotal: number;
}

export function CalorieTracker({
  caloriesRemaining,
  caloriesTotal,
}: CalorieTrackerProps) {
  const { t } = useI18n();
  const percentage =
    ((caloriesTotal - caloriesRemaining) / caloriesTotal) * 100;

  return (
    <div className="bg-gradient-to-br from-purple-400 to-purple-300 rounded-2xl p-12 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48 mb-6">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(0,0,0,0.8)"
              strokeWidth="8"
              strokeDasharray={`${(percentage / 100) * 283} 283`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <UiText variant="h1" weight="bold" className="text-black">
              {caloriesRemaining}
            </UiText>
            <UiText variant="small" weight="semibold" className="text-gray-700">
              {t("left")}
            </UiText>
          </div>
        </div>
        <div className="flex gap-12 text-black">
          <UiText variant="small" weight="semibold">
            0
          </UiText>
          <UiText variant="small" weight="semibold">
            {caloriesTotal}
          </UiText>
        </div>
      </div>
    </div>
  );
}
