"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";
import { useLogout } from "@/features/auth";
import { useLang } from "@/features/i18n";
import { useUpdatePreferences } from "@/features/preferences";
import { useColorTheme, type ColorTheme, type Theme } from "@/features/theme";
import { type LangPreference } from "@/features/i18n";
import { useMenuState } from "./use-menu-state";
import { useUserDisplay } from "./use-user-display";

export function useAccountMenu() {
  const menuState = useMenuState();
  const userDisplay = useUserDisplay();

  const { theme, setTheme } = useTheme();
  const { langPreference, setLang } = useLang();
  const { colorTheme, setColorTheme } = useColorTheme();
  const { logout } = useLogout();
  const { updatePreferences } = useUpdatePreferences();

  const handleThemeChange = useCallback(
    (newTheme: Theme) => {
      setTheme(newTheme);
      updatePreferences({ theme: newTheme });
      menuState.closeMenu();
    },
    [setTheme, updatePreferences, menuState.closeMenu]
  );

  const handleLangChange = useCallback(
    (newLang: LangPreference) => {
      setLang(newLang);
      updatePreferences({ lang: newLang });
      menuState.closeMenu();
    },
    [setLang, updatePreferences, menuState.closeMenu]
  );

  const handleColorThemeChange = useCallback(
    (newColorTheme: ColorTheme) => {
      setColorTheme(newColorTheme);
      updatePreferences({ colorTheme: newColorTheme });
      menuState.closeMenu();
    },
    [setColorTheme, updatePreferences, menuState.closeMenu]
  );

  const handleLogout = useCallback(() => {
    menuState.closeMenu();
    logout();
  }, [logout, menuState.closeMenu]);

  return {
    ...menuState,

    ...userDisplay,

    theme: (theme as Theme) || "system",
    lang: langPreference,
    colorTheme,

    handleThemeChange,
    handleLangChange,
    handleColorThemeChange,
    handleLogout,
  };
}
