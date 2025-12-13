import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  title: {
    en: "Sign in",
    ru: "Вход",
  },
  description: {
    en: "Welcome back! Please sign in to continue",
    ru: "С возвращением! Пожалуйста, войдите, чтобы продолжить",
  },
  footerText: {
    en: "Don't have account?",
    ru: "Нет аккаунта?",
  },
  signUpLink: {
    en: "Sign up",
    ru: "Зарегистрироваться",
  },
} as const);
