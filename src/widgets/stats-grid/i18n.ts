import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  waterIntake: {
    en: "Water Intake",
    ru: "Потребление воды",
  },
  steps: {
    en: "Steps",
    ru: "Шаги",
  },
  ofGoal: {
    en: "of {goal} goal",
    ru: "из {goal} цели",
  },
} as const);
