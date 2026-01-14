import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  profile: {
    en: "Profile",
    ru: "Профиль",
  },
  theme: {
    en: "Theme",
    ru: "Тема",
  },
  settings: {
    en: "Settings",
    ru: "Настройки",
  },
  logout: {
    en: "Log out",
    ru: "Выйти",
  },
  themeSystem: {
    en: "Use device theme",
    ru: "Как на устройстве",
  },
  themeDark: {
    en: "Dark",
    ru: "Тёмная",
  },
  themeLight: {
    en: "Light",
    ru: "Светлая",
  },
  themeDescription: {
    en: "This setting will only apply to this browser",
    ru: "Настройка будет применена только в этом браузере",
  },
  // Language
  language: {
    en: "Language",
    ru: "Язык",
  },
  langEn: {
    en: "English",
    ru: "English",
  },
  langRu: {
    en: "Русский",
    ru: "Русский",
  },
  // Color theme
  colorTheme: {
    en: "Color",
    ru: "Цвет",
  },
  colorOrange: {
    en: "Orange",
    ru: "Оранжевый",
  },
  colorBlue: {
    en: "Blue",
    ru: "Синий",
  },
  colorGreen: {
    en: "Green",
    ru: "Зелёный",
  },
  colorRed: {
    en: "Red",
    ru: "Красный",
  },
  colorPurple: {
    en: "Purple",
    ru: "Фиолетовый",
  },
  colorPink: {
    en: "Pink",
    ru: "Розовый",
  },
  colorYellow: {
    en: "Yellow",
    ru: "Жёлтый",
  },
} as const);
