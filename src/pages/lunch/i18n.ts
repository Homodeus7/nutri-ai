import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  title: {
    en: "Lunch Planning",
    ru: "Планирование обеда",
  },
  description: {
    en: "Plan and track your lunch meals here.",
    ru: "Планируйте и отслеживайте свои обеды здесь.",
  },
} as const);
