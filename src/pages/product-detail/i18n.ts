import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  backToList: {
    en: "Back to products",
    ru: "Назад к продуктам",
  },
  nutritionPer100g: {
    en: "Nutrition per 100g",
    ru: "Пищевая ценность на 100г",
  },
  details: {
    en: "Details",
    ru: "Детали",
  },
  kcal: {
    en: "Calories",
    ru: "Калории",
  },
  protein: {
    en: "Protein",
    ru: "Белки",
  },
  fat: {
    en: "Fat",
    ru: "Жиры",
  },
  carbs: {
    en: "Carbs",
    ru: "Углеводы",
  },
  fiber: {
    en: "Fiber",
    ru: "Клетчатка",
  },
  sugar: {
    en: "Sugar",
    ru: "Сахар",
  },
  source: {
    en: "Source",
    ru: "Источник",
  },
  category: {
    en: "Category",
    ru: "Категория",
  },
  verified: {
    en: "Verified",
    ru: "Проверен",
  },
  barcode: {
    en: "Barcode",
    ru: "Штрихкод",
  },
  brand: {
    en: "Brand",
    ru: "Бренд",
  },
  yes: {
    en: "Yes",
    ru: "Да",
  },
  no: {
    en: "No",
    ru: "Нет",
  },
  notFound: {
    en: "Product not found.",
    ru: "Продукт не найден.",
  },
} as const);
