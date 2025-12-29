import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  title: {
    en: "Delete product",
    ru: "Удалить продукт",
  },
  description: {
    en: "Are you sure you want to remove this product from the meal?",
    ru: "Вы уверены, что хотите удалить этот продукт из приема пищи?",
  },
  delete: {
    en: "Delete",
    ru: "Удалить",
  },
  cancel: {
    en: "Cancel",
    ru: "Отмена",
  },
} as const);
