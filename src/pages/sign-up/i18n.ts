import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  title: {
    en: "Sign up",
    ru: "Регистрация",
  },
  description: {
    en: "Create your account to start tracking your nutrition",
    ru: "Создайте аккаунт, чтобы начать отслеживать питание",
  },
  footerText: {
    en: "Already have an account?",
    ru: "Уже есть аккаунт?",
  },
  signInLink: {
    en: "Sign in",
    ru: "Войти",
  },
} as const);
