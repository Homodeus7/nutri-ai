import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  goodMorning: {
    en: "Good Morning",
    ru: "Доброе утро",
  },
  goodAfternoon: {
    en: "Good Afternoon",
    ru: "Добрый день",
  },
  goodEvening: {
    en: "Good Evening",
    ru: "Добрый вечер",
  },
  goodNight: {
    en: "Good Night",
    ru: "Доброй ночи",
  },
} as const);
