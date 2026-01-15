"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";
import { useLogout } from "@/features/auth";
import { useLang } from "@/features/i18n";
import { useColorTheme, type ColorTheme } from "@/features/theme";
import { useMenuState } from "./use-menu-state";
import { useUserDisplay } from "./use-user-display";
import type { Theme, Lang } from "./types";

export function useAccountMenu() {
  const menuState = useMenuState();
  const userDisplay = useUserDisplay();

  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLang();
  const { colorTheme, setColorTheme } = useColorTheme();
  const { logout } = useLogout();

  const handleThemeChange = useCallback(
    (newTheme: Theme) => {
      setTheme(newTheme);
      menuState.closeMenu();
    },
    [setTheme, menuState.closeMenu]
  );

  const handleLangChange = useCallback(
    (newLang: Lang) => {
      setLang(newLang);
      menuState.closeMenu();
    },
    [setLang, menuState.closeMenu]
  );

  const handleColorThemeChange = useCallback(
    (newColorTheme: ColorTheme) => {
      setColorTheme(newColorTheme);
      menuState.closeMenu();
    },
    [setColorTheme, menuState.closeMenu]
  );

  const handleLogout = useCallback(() => {
    menuState.closeMenu();
    logout();
  }, [logout, menuState.closeMenu]);

  return {
    ...menuState,

    ...userDisplay,

    theme: (theme as Theme) || "system",
    lang,
    colorTheme,

    handleThemeChange,
    handleLangChange,
    handleColorThemeChange,
    handleLogout,
  };
}
