import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  // Dialog titles
  addFoodTo: {
    en: "Add food to",
    ru: "Добавить продукт в",
  },
  createProductTitle: {
    en: "Create product",
    ru: "Создать продукт",
  },

  // Tab labels
  searchTab: {
    en: "Food",
    ru: "Еда",
  },
  recentTab: {
    en: "Recent",
    ru: "Недавние",
  },
  aiTab: {
    en: "AI",
    ru: "AI",
  },

  // AI Input Tab
  aiInputQuestion: {
    en: "What did you eat today?",
    ru: "Что вы сегодня съели?",
  },
  aiInputPlaceholder: {
    en: "Oatmeal with banana, coffee with milk...",
    ru: "Овсянка с бананом, кофе с молоком...",
  },

  // Navigation
  backToSearch: {
    en: "← Back to search",
    ru: "← Назад к поиску",
  },

  // SearchTabLayout
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
