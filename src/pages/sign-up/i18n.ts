import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  appTagline: {
    en: "Food Calorie Tracker App",
    ru: "Приложение для подсчёта калорий",
  },
  title: {
    en: "Get started",
    ru: "Начните сейчас",
  },
  description: {
    en: "Sign up with your Google account",
    ru: "Зарегистрируйтесь с помощью Google",
  },
  footerText: {
    en: "Already have an account?",
    ru: "Уже есть аккаунт?",
  },
  signInLink: {
    en: "Sign in",
    ru: "Войти",
  },
  or: {
    en: "Or continue with",
    ru: "Или продолжить с помощью",
  },
} as const);
