import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  appName: {
    en: "Nutri AI",
    ru: "Nutri AI",
  },
  board: {
    en: "Board",
    ru: "Доска",
  },
  meals: {
    en: "Meals",
    ru: "Питание",
  },
  boost: {
    en: "Boost",
    ru: "Усилители",
  },
  lunch: {
    en: "Lunch",
    ru: "Обед",
  },
  more: {
    en: "More",
    ru: "Ещё",
  },
} as const);
