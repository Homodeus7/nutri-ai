import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  // Dialog
  title: {
    en: "Edit product",
    ru: "Редактировать продукт",
  },

  // Form labels
  nameLabel: {
    en: "Product name",
    ru: "Название продукта",
  },
  namePlaceholder: {
    en: "e.g., Oatmeal",
    ru: "напр., Овсянка",
  },
  kcalLabel: {
    en: "Calories per 100g",
    ru: "Калории на 100г",
  },
  proteinLabel: {
    en: "Protein per 100g",
    ru: "Белки на 100г",
  },
  fatLabel: {
    en: "Fat per 100g",
    ru: "Жиры на 100г",
  },
  carbsLabel: {
    en: "Carbs per 100g",
    ru: "Углеводы на 100г",
  },
  fiberLabel: {
    en: "Fiber per 100g",
    ru: "Клетчатка на 100г",
  },
  sugarLabel: {
    en: "Sugar per 100g",
    ru: "Сахар на 100г",
  },
  barcodeLabel: {
    en: "Barcode",
    ru: "Штрихкод",
  },
  barcodePlaceholder: {
    en: "EAN/UPC code",
    ru: "EAN/UPC код",
  },
  brandLabel: {
    en: "Brand",
    ru: "Бренд",
  },
  brandPlaceholder: {
    en: "e.g., Nestlé",
    ru: "напр., Nestlé",
  },
  categoryLabel: {
    en: "Category",
    ru: "Категория",
  },
  categoryPlaceholder: {
    en: "e.g., Cereals",
    ru: "напр., Крупы",
  },

  // Buttons
  saveButton: {
    en: "Save changes",
    ru: "Сохранить",
  },
  cancelButton: {
    en: "Cancel",
    ru: "Отмена",
  },

  // Messages
  successMessage: {
    en: "Product updated successfully!",
    ru: "Продукт успешно обновлён!",
  },
  errorMessage: {
    en: "Failed to update product",
    ru: "Не удалось обновить продукт",
  },

  // Validation errors
  nameRequired: {
    en: "Product name is required",
    ru: "Название продукта обязательно",
  },
  kcalInvalid: {
    en: "Calories must be a number",
    ru: "Калории должны быть числом",
  },
  kcalMustBeInteger: {
    en: "Calories must be a whole number",
    ru: "Калории должны быть целым числом",
  },
  kcalMustBePositive: {
    en: "Calories must be positive",
    ru: "Калории должны быть положительными",
  },
  proteinInvalid: {
    en: "Protein must be a number",
    ru: "Белки должны быть числом",
  },
  proteinMustBePositive: {
    en: "Protein must be positive",
    ru: "Белки должны быть положительными",
  },
  fatInvalid: {
    en: "Fat must be a number",
    ru: "Жиры должны быть числом",
  },
  fatMustBePositive: {
    en: "Fat must be positive",
    ru: "Жиры должны быть положительными",
  },
  carbsInvalid: {
    en: "Carbs must be a number",
    ru: "Углеводы должны быть числом",
  },
  carbsMustBePositive: {
    en: "Carbs must be positive",
    ru: "Углеводы должны быть положительными",
  },
  fiberInvalid: {
    en: "Fiber must be a number",
    ru: "Клетчатка должна быть числом",
  },
  fiberMustBePositive: {
    en: "Fiber must be positive",
    ru: "Клетчатка должна быть положительной",
  },
  sugarInvalid: {
    en: "Sugar must be a number",
    ru: "Сахар должен быть числом",
  },
  sugarMustBePositive: {
    en: "Sugar must be positive",
    ru: "Сахар должен быть положительным",
  },
} as const);
