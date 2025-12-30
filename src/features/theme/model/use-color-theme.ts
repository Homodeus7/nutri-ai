"use client";

import { useEffect, useState } from "react";

export type ColorTheme =
  | "orange"
  | "blue"
  | "green"
  | "red"
  | "purple"
  | "pink"
  | "yellow";

const COLOR_THEME_KEY = "color-theme";
const DEFAULT_COLOR_THEME: ColorTheme = "orange";

export function useColorTheme() {
  const [colorTheme, setColorThemeState] = useState<ColorTheme | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(COLOR_THEME_KEY) as ColorTheme | null;
    setColorThemeState(stored || DEFAULT_COLOR_THEME);
  }, []);

  useEffect(() => {
    if (!mounted || !colorTheme) return;

    const root = document.documentElement;

    // Remove all theme classes
    root.classList.remove(
      "theme-orange",
      "theme-blue",
      "theme-green",
      "theme-red",
      "theme-purple",
      "theme-pink",
      "theme-yellow"
    );

    // Add the selected theme class
    root.classList.add(`theme-${colorTheme}`);

    // Save to localStorage
    localStorage.setItem(COLOR_THEME_KEY, colorTheme);
  }, [colorTheme, mounted]);

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
  };

  return {
    colorTheme: mounted ? colorTheme : null,
    setColorTheme,
    mounted,
  };
}
