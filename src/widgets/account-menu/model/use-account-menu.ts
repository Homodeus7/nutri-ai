"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/entities/auth";
import { useLogout } from "@/features/auth";
import { useLang } from "@/features/i18n";
import { useColorTheme, type ColorTheme } from "@/features/theme";
import { getGoogleAvatarUrl } from "../lib/get-google-avatar";
import type { MenuView, SlideDirection, Theme, Lang } from "./types";

export function useAccountMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<MenuView>("main");
  const [slideDirection, setSlideDirection] = useState<SlideDirection>("left");
  const [mounted, setMounted] = useState(false);

  const { user } = useAuthStore();
  const { logout } = useLogout();
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLang();
  const { colorTheme, setColorTheme } = useColorTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset view when menu closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setCurrentView("main");
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Navigation handlers
  const navigateTo = useCallback((view: MenuView) => {
    setSlideDirection("left");
    setCurrentView(view);
  }, []);

  const navigateBack = useCallback(() => {
    setSlideDirection("right");
    setCurrentView("main");
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Settings handlers
  const handleThemeChange = useCallback(
    (newTheme: Theme) => {
      setTheme(newTheme);
      closeMenu();
    },
    [setTheme, closeMenu]
  );

  const handleLangChange = useCallback(
    (newLang: Lang) => {
      setLang(newLang);
      closeMenu();
    },
    [setLang, closeMenu]
  );

  const handleColorThemeChange = useCallback(
    (newColorTheme: ColorTheme) => {
      setColorTheme(newColorTheme);
      closeMenu();
    },
    [setColorTheme, closeMenu]
  );

  const handleLogout = useCallback(() => {
    closeMenu();
    logout();
  }, [logout, closeMenu]);

  // Derived values
  const avatarUrl = getGoogleAvatarUrl();
  const displayName = user?.displayName || user?.email?.split("@")[0] || "";
  const email = user?.email || "";

  return {
    // State
    isOpen,
    setIsOpen,
    currentView,
    slideDirection,
    mounted,

    // User data
    user,
    avatarUrl,
    displayName,
    email,

    // Current values
    theme: (theme as Theme) || "system",
    lang,
    colorTheme,

    // Navigation
    navigateTo,
    navigateBack,

    // Handlers
    handleThemeChange,
    handleLangChange,
    handleColorThemeChange,
    handleLogout,
  };
}
