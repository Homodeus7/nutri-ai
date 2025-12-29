import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  title: {
    en: "Edit quantity",
    ru: "Изменить количество",
  },
  productLabel: {
    en: "Product",
    ru: "Продукт",
  },
  quantity: {
    en: "Quantity (g)",
    ru: "Количество (г)",
  },
  quantityInvalid: {
    en: "Quantity must be a valid number",
    ru: "Количество должно быть числом",
  },
  quantityMustBePositive: {
    en: "Quantity must be positive",
    ru: "Количество должно быть положительным",
  },
  save: {
    en: "Save",
    ru: "Сохранить",
  },
  cancel: {
    en: "Cancel",
    ru: "Отмена",
  },
} as const);
