import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  title: {
    en: "Macros Distribution",
    ru: "Распределение БЖУ",
  },
  protein: {
    en: "Protein",
    ru: "Белки",
  },
  fat: {
    en: "Fat",
    ru: "Жиры",
  },
  carbs: {
    en: "Carbs",
    ru: "Углеводы",
  },
  noData: {
    en: "No data",
    ru: "Нет данных",
  },
  grams: {
    en: "g",
    ru: "г",
  },
} as const);
