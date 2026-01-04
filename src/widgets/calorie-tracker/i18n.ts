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
    en: "Left",
    ru: "Осталось",
  },
} as const);
