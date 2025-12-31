import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  title: {
    en: "Products",
    ru: "Продукты",
  },
  description: {
    en: "Browse and manage food products database.",
    ru: "Просмотр и управление базой продуктов питания.",
  },
  name: {
    en: "Name",
    ru: "Название",
  },
  kcal: {
    en: "Kcal",
    ru: "Ккал",
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
  source: {
    en: "Source",
    ru: "Источник",
  },
  category: {
    en: "Category",
    ru: "Категория",
  },
  noProducts: {
    en: "No products found.",
    ru: "Продукты не найдены.",
  },
  searchPlaceholder: {
    en: "Search products...",
    ru: "Поиск продуктов...",
  },
  all: {
    en: "All",
    ru: "Все",
  },
} as const);
