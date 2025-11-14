import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  mon: {
    en: "Mon",
    ru: "Пн",
  },
  tue: {
    en: "Tue",
    ru: "Вт",
  },
  wed: {
    en: "Wed",
    ru: "Ср",
  },
  thu: {
    en: "Thu",
    ru: "Чт",
  },
  fri: {
    en: "Fri",
    ru: "Пт",
  },
  sat: {
    en: "Sat",
    ru: "Сб",
  },
  sun: {
    en: "Sun",
    ru: "Вс",
  },
} as const);
