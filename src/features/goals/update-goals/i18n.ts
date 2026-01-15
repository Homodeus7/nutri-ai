import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  // Labels
  dailyKcalLabel: {
    en: "Daily Calorie Goal",
    ru: "Суточная норма калорий",
  },
  proteinLabel: {
    en: "Protein",
    ru: "Белки",
  },
  fatLabel: {
    en: "Fat",
    ru: "Жиры",
  },
  carbsLabel: {
    en: "Carbs",
    ru: "Углеводы",
  },
  presetLabel: {
    en: "Preset",
    ru: "Шаблон",
  },

  // Presets
  balanced: {
    en: "Balanced (30/30/40)",
    ru: "Сбалансированное (30/30/40)",
  },
  highProtein: {
    en: "High Protein (40/30/30)",
    ru: "Высокобелковое (40/30/30)",
  },
  keto: {
    en: "Keto (20/70/10)",
    ru: "Кето (20/70/10)",
  },
  lowFat: {
    en: "Low Fat (35/20/45)",
    ru: "Низкожировое (35/20/45)",
  },
  custom: {
    en: "Custom",
    ru: "Свой вариант",
  },

  // Calculated values
  gramsLabel: {
    en: "g",
    ru: "г",
  },
  calculatedGrams: {
    en: "Calculated amount",
    ru: "Рассчитанное количество",
  },

  // Validation
  sumLabel: {
    en: "Total",
    ru: "Сумма",
  },
  sumError: {
    en: "Sum of percentages must equal 100%",
    ru: "Сумма процентов должна равняться 100%",
  },
  kcalRequired: {
    en: "Calorie goal is required",
    ru: "Укажите норму калорий",
  },
  kcalMin: {
    en: "Minimum 1000 kcal",
    ru: "Минимум 1000 ккал",
  },
  kcalMax: {
    en: "Maximum 10000 kcal",
    ru: "Максимум 10000 ккал",
  },
  percentRequired: {
    en: "Required",
    ru: "Обязательно",
  },
  percentMin: {
    en: "Minimum 5%",
    ru: "Минимум 5%",
  },
  percentMax: {
    en: "Maximum 80%",
    ru: "Максимум 80%",
  },

  // Buttons & Messages
  submitButton: {
    en: "Save Goals",
    ru: "Сохранить цели",
  },
  successMessage: {
    en: "Goals saved successfully!",
    ru: "Цели успешно сохранены!",
  },
  errorMessage: {
    en: "Failed to save goals",
    ru: "Не удалось сохранить цели",
  },
  loadingMessage: {
    en: "Loading goals...",
    ru: "Загрузка целей...",
  },
} as const);
