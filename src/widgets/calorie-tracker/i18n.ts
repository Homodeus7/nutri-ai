import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  title: {
    en: "Daily Calories",
    ru: "Калории за день",
  },
  description: {
    en: "Today's progress",
    ru: "Прогресс за сегодня",
  },
  left: {
    en: "left",
    ru: "осталось",
  },
  over: {
    en: "over",
    ru: "превышено",
  },
  summary: {
    en: "Summary",
    ru: "Сводка",
  },
  remaining: {
    en: "Remaining",
    ru: "Осталось",
  },
  consumed: {
    en: "Consumed",
    ru: "Употреблено",
  },
  percentOfGoal: {
    en: "% of Goal",
    ru: "% от цели",
  },
  goal: {
    en: "Goal",
    ru: "Цель",
  },
  unit: {
    en: "kcal",
    ru: "ккал",
  },
} as const);
