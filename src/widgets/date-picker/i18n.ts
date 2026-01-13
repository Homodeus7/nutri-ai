import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  // Days of week
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
  // Months
  january: {
    en: "January",
    ru: "Январь",
  },
  february: {
    en: "February",
    ru: "Февраль",
  },
  march: {
    en: "March",
    ru: "Март",
  },
  april: {
    en: "April",
    ru: "Апрель",
  },
  may: {
    en: "May",
    ru: "Май",
  },
  june: {
    en: "June",
    ru: "Июнь",
  },
  july: {
    en: "July",
    ru: "Июль",
  },
  august: {
    en: "August",
    ru: "Август",
  },
  september: {
    en: "September",
    ru: "Сентябрь",
  },
  october: {
    en: "October",
    ru: "Октябрь",
  },
  november: {
    en: "November",
    ru: "Ноябрь",
  },
  december: {
    en: "December",
    ru: "Декабрь",
  },
  // UI elements
  calendar: {
    en: "Calendar",
    ru: "Календарь",
  },
} as const);
