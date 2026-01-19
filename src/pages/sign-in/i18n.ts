import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  appTagline: {
    en: "Food Calorie Tracker App",
    ru: "Приложение для подсчёта калорий",
  },
  title: {
    en: "Welcome back",
    ru: "С возвращением",
  },
  description: {
    en: "Login with your Google account",
    ru: "Войдите с помощью вашей учетной записи Google",
  },
  footerText: {
    en: "Don't have account?",
    ru: "Нет аккаунта?",
  },
  signUpLink: {
    en: "Sign up",
    ru: "Зарегистрироваться",
  },
  or: {
    en: "Or continue with",
    ru: "Или продолжить с помощью",
  },
} as const);
