import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  title: {
    en: "Meals Tracking",
    ru: "Отслеживание приемов пищи",
  },
  description: {
    en: "Track your daily meals and nutrition here.",
    ru: "Отслеживайте свои ежедневные приемы пищи и питание здесь.",
  },
} as const);
