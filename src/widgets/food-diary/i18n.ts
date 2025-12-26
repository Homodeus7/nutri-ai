import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  // food-diary
  title: {
    en: "Food Diary",
    ru: "Пищевой дневник",
  },

  // meal names
  breakfast: {
    en: "Breakfast",
    ru: "Завтрак",
  },
  lunch: {
    en: "Lunch",
    ru: "Обед",
  },
  dinner: {
    en: "Dinner",
    ru: "Ужин",
  },
  snack: {
    en: "Snack",
    ru: "Перекус",
  },

  // add-food-dialog
  addFoodTo: {
    en: "Add food to",
    ru: "Добавить продукт в",
  },
  foodName: {
    en: "Food name",
    ru: "Название продукта",
  },
  foodNamePlaceholder: {
    en: "e.g., Oatmeal",
    ru: "Например: Овсянка",
  },
  caloriesLabel: {
    en: "Calories (kcal)",
    ru: "Калории (ккал)",
  },
  proteinLabel: {
    en: "Protein (g)",
    ru: "Белки (г)",
  },
  fatLabel: {
    en: "Fat (g)",
    ru: "Жиры (г)",
  },
  carbsLabel: {
    en: "Carbs (g)",
    ru: "Углеводы (г)",
  },
  addButton: {
    en: "Add",
    ru: "Добавить",
  },

  // empty state
  noEntries: {
    en: "No entries",
    ru: "Нет записей",
  },
  clickToAdd: {
    en: "Click + to add",
    ru: "Нажмите + чтобы добавить",
  },

  // meal totals
  totalCalories: {
    en: "Total calories:",
    ru: "Всего калорий:",
  },
  kcal: {
    en: "kcal",
    ru: "ккал",
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
    ru: "Углев.",
  },
  g: {
    en: "g",
    ru: "г",
  },

  // SearchTabLayout (from search-product feature)
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

  // SearchProductsTab (from search-product feature)
  noResults: {
    en: "Nothing found",
    ru: "Ничего не найдено",
  },
  createProduct: {
    en: "Create product",
    ru: "Создать продукт",
  },
} as const);
