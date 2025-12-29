import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  logout: {
    en: "Logout",
    ru: "Выйти",
  },
  logoutConfirm: {
    en: "Are you sure you want to logout?",
    ru: "Вы уверены, что хотите выйти?",
  },
} as const);
