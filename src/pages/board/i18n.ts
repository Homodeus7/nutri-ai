import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  goodMorning: {
    en: "Good Morning",
    ru: "Доброе утро",
  },
  welcomeBack: {
    en: "Welcome back!",
    ru: "С возвращением!",
  },
  macronutrients: {
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
} as const);
