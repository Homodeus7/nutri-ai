import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  title: {
    en: "Macronutrients",
    ru: "Макронутриенты",
  },
  carbs: {
    en: "Carbs",
    ru: "Углеводы",
  },
  protein: {
    en: "Protein",
    ru: "Белки",
  },
  fat: {
    en: "Fat",
    ru: "Жиры",
  },
  fiber: {
    en: "Fiber",
    ru: "Клетчатка",
  },
  current: {
    en: "Current",
    ru: "Текущее",
  },
  goal: {
    en: "Goal",
    ru: "Цель",
  },
} as const);
