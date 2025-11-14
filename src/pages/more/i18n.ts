import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  title: {
    en: "More Options",
    ru: "Дополнительные настройки",
  },
  description: {
    en: "Additional settings and features.",
    ru: "Дополнительные настройки и функции.",
  },
} as const);
