import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  // ProductsTable - headers
  productName: {
    en: "Name",
    ru: "Название",
  },
  kcalPer100g: {
    en: "kcal/100g",
    ru: "ккал/100г",
  },
  protein: {
    en: "P",
    ru: "Б",
  },
  fat: {
    en: "F",
    ru: "Ж",
  },
  carbs: {
    en: "C",
    ru: "У",
  },
  quantity: {
    en: "Qty",
    ru: "Кол-во",
  },

  // ProductsTable - pagination
  pageOf: {
    en: "Page {page} of {total}",
    ru: "Страница {page} из {total}",
  },

  // ProductsTable - actions
  addSelected: {
    en: "Add ({count})",
    ru: "Добавить ({count})",
  },

  // SearchTabLayout
  backToSearch: {
    en: "← Back to search",
    ru: "← Назад к поиску",
  },
  startTyping: {
    en: "Start typing product name",
    ru: "Начните вводить название продукта",
  },
  searching: {
    en: "Searching...",
    ru: "Поиск...",
  },

  // SearchProductsTab
  noResults: {
    en: "Nothing found",
    ru: "Ничего не найдено",
  },
  createProduct: {
    en: "Create product",
    ru: "Создать продукт",
  },
} as const);
