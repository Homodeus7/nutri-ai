import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  goodMorning: {
    en: "Good Morning!",
    ru: "Доброе утро!",
  },
} as const);
