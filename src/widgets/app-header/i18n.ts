import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  appName: {
    en: "Nutri AI",
    ru: "Nutri AI",
  },
  dashboard: {
    en: "Dashboard",
    ru: "Главная",
  },
} as const);
