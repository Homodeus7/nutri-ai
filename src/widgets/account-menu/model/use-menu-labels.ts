"use client";

import type { ColorTheme } from "@/features/theme";
import { useI18n } from "../i18n";
import type { Theme, Lang } from "./types";

export function useMenuLabels(mounted: boolean) {
  const { t } = useI18n();

  const getThemeLabel = (theme: Theme): string => {
    if (!mounted) return "";
    switch (theme) {
      case "dark":
        return t("themeDark");
      case "light":
        return t("themeLight");
      default:
        return t("themeSystem");
    }
  };

  const getLangLabel = (lang: Lang): string => {
    if (!mounted) return "";
    switch (lang) {
      case "ru":
        return t("langRu");
      case "en":
        return t("langEn");
      default:
        return t("langEn");
    }
  };

  const getColorLabel = (colorTheme: ColorTheme | null): string => {
    if (!mounted || !colorTheme) return "";
    const colorLabels: Record<ColorTheme, string> = {
      orange: t("colorOrange"),
      blue: t("colorBlue"),
      green: t("colorGreen"),
      red: t("colorRed"),
      purple: t("colorPurple"),
      pink: t("colorPink"),
      yellow: t("colorYellow"),
    };
    return colorLabels[colorTheme] || t("colorOrange");
  };

  return {
    getThemeLabel,
    getLangLabel,
    getColorLabel,
  };
}
