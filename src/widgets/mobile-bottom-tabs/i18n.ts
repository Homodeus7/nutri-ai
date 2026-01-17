import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  navigation: {
    en: "Main navigation",
    ru: "Главная навигация",
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
    ru: "Буст",
  },
  lunch: {
    en: "Lunch",
    ru: "Обед",
  },
} as const);
