import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  current: {
    en: "Current",
    ru: "Текущее",
  },
  goal: {
    en: "Goal",
    ru: "Цель",
  },
} as const);
