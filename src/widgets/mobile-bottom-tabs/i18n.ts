import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  board: {
    en: "Board",
    ru: "Доска",
  },
  products: {
    en: "Products",
    ru: "Продукты",
  },
  boost: {
    en: "Boost",
    ru: "Буст",
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
