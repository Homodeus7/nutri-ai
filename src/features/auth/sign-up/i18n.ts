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
  confirmPasswordLabel: {
    en: "Confirm Password",
    ru: "Подтвердите пароль",
  },
  confirmPasswordPlaceholder: {
    en: "Confirm your password",
    ru: "Подтвердите ваш пароль",
  },
  displayNameLabel: {
    en: "Display Name (optional)",
    ru: "Отображаемое имя (опционально)",
  },
  displayNamePlaceholder: {
    en: "John Doe",
    ru: "Иван Иванов",
  },
  submitButton: {
    en: "Sign Up",
    ru: "Зарегистрироваться",
  },
  successMessage: {
    en: "Successfully signed up!",
    ru: "Регистрация прошла успешно!",
  },
  errorMessage: {
    en: "Failed to sign up",
    ru: "Не удалось зарегистрироваться",
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
  confirmPasswordRequired: {
    en: "Please confirm your password",
    ru: "Пожалуйста, подтвердите пароль",
  },
  passwordsDoNotMatch: {
    en: "Passwords do not match",
    ru: "Пароли не совпадают",
  },
  or: {
    en: "or",
    ru: "или",
  },
} as const);
