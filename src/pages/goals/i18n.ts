import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  title: {
    en: "My Goals",
    ru: "Мои цели",
  },
  description: {
    en: "Set your daily calorie and macronutrient goals",
    ru: "Установите свои суточные цели по калориям и макронутриентам",
  },
  save: {
    en: "Save Changes",
    ru: "Сохранить изменения",
  },
  loading: {
    en: "Loading goals...",
    ru: "Загрузка целей...",
  },
} as const);
