import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  appName: {
    en: "Nutri AI",
    ru: "Nutri AI",
  },
  diary: {
    en: "Diary",
    ru: "Дневник",
  },
  products: {
    en: "Products",
    ru: "Продукты",
  },
  goals: {
    en: "Goals",
    ru: "Цели",
  },
  boost: {
    en: "Boost",
    ru: "Усилители",
  },
  lunch: {
    en: "Lunch",
    ru: "Обед",
  },
} as const);
