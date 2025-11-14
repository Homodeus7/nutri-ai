import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  title: {
    en: "Supplements & Boosts",
    ru: "Добавки и усилители",
  },
  description: {
    en: "Manage your supplements and energy boosts here.",
    ru: "Управляйте своими добавками и энергетическими усилителями здесь.",
  },
} as const);
