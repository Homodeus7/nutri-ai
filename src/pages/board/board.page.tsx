"use client";

import { CalorieTracker } from "@/widgets/calorie-tracker";
import { MacroCard } from "@/widgets/macro-card";
import { StatsGrid } from "@/widgets/stats-grid";
import { DatePicker } from "@/widgets/date-picker";
import { Card, CardContent } from "@/shared/ui/primitives/card";
import { UiText } from "@/shared/ui/ui-text";
import { useI18n } from "./i18n";

export function BoardPage() {
  const { t } = useI18n();
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-3xl mb-4">
              👤
            </div>
            <div>
              <UiText variant="h4" weight="bold">
                {t("goodMorning")}
              </UiText>
              <UiText variant="muted">{t("welcomeBack")}</UiText>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          <DatePicker />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CalorieTracker caloriesRemaining={1672} caloriesTotal={2500} />
        </div>
        <div className="flex flex-col gap-4">
          <StatsGrid
            waterIntake="2.3L"
            waterGoal="3L"
            steps="8,432"
            stepsGoal="10k"
          />
        </div>
      </div>

      <div>
        <UiText variant="h3" weight="bold" className="mb-6">
          {t("macronutrients")}
        </UiText>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MacroCard
            label={t("carbs")}
            current={140}
            total={200}
            unit="g"
            bgColor="bg-yellow-300"
            icon="🥗"
          />
          <MacroCard
            label={t("protein")}
            current={60}
            total={120}
            unit="g"
            bgColor="bg-green-400"
            icon="🥚"
          />
          <MacroCard
            label={t("fat")}
            current={45}
            total={65}
            unit="g"
            bgColor="bg-orange-400"
            icon="🥑"
          />
          <MacroCard
            label={t("fiber")}
            current={18}
            total={25}
            unit="g"
            bgColor="bg-purple-400"
            icon="🥬"
          />
        </div>
      </div>
    </div>
  );
}
