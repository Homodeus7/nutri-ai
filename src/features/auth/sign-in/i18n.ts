import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  emailLabel: {
    en: "Email",
    ru: "Электронная почта",
  },
  emailPlaceholder: {
    en: "m@example.com",
    ru: "m@example.com",
  },
  passwordLabel: {
    en: "Password",
    ru: "Пароль",
  },
  passwordPlaceholder: {
    en: "Enter your password",
    ru: "Введите пароль",
  },
  submitButton: {
    en: "Sign In",
    ru: "Войти",
  },
  successMessage: {
    en: "Successfully signed in!",
    ru: "Вы успешно вошли!",
  },
  errorMessage: {
    en: "Failed to sign in",
    ru: "Не удалось войти",
  },
  validationError: {
    en: "Please fix the validation errors",
    ru: "Пожалуйста, исправьте ошибки валидации",
  },
  // Validation error messages
  emailRequired: {
    en: "Email is required",
    ru: "Email обязателен",
  },
  emailInvalid: {
    en: "Please enter a valid email address",
    ru: "Пожалуйста, введите корректный email",
  },
  passwordRequired: {
    en: "Password is required",
    ru: "Пароль обязателен",
  },
  passwordMinLength: {
    en: "Password must be at least 8 characters",
    ru: "Пароль должен содержать минимум 8 символов",
  },
  or: {
    en: "or",
    ru: "или",
  },
} as const);
