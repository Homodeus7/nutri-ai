"use client";

import { UiText } from "@/shared/ui/ui-text";

interface DietPlanProps {
  title?: string;
  icon?: string;
}

export function DietPlan({
  title = "Healthy Meals",
  icon = "🥗",
}: DietPlanProps) {
  return (
    <div className="bg-gradient-to-r from-green-100 to-lime-100 rounded-2xl overflow-hidden">
      <div className="flex items-end h-64 relative">
        <div className="flex-1 h-full bg-gradient-to-br from-green-300 to-green-400 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl">{icon}</p>
            <UiText
              variant="small"
              weight="semibold"
              className="mt-2 text-green-900"
            >
              {title}
            </UiText>
          </div>
        </div>
      </div>
    </div>
  );
}
