import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  // Dialog
  title: {
    en: "Delete product",
    ru: "Удалить продукт",
  },
  description: {
    en: "Are you sure you want to delete this product? This action cannot be undone.",
    ru: "Вы уверены, что хотите удалить этот продукт? Это действие нельзя отменить.",
  },

  // Buttons
  deleteButton: {
    en: "Delete",
    ru: "Удалить",
  },
  cancelButton: {
    en: "Cancel",
    ru: "Отмена",
  },

  // Messages
  successMessage: {
    en: "Product deleted successfully!",
    ru: "Продукт успешно удалён!",
  },
  errorMessage: {
    en: "Failed to delete product",
    ru: "Не удалось удалить продукт",
  },
} as const);
