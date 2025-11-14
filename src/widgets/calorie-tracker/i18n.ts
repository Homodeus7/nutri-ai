import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  left: {
    en: "Left",
    ru: "Осталось",
  },
} as const);
