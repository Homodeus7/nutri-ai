"use client";

import { useState, useEffect, useCallback } from "react";
import type { MenuView, SlideDirection } from "./types";

export function useMenuState() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<MenuView>("main");
  const [slideDirection, setSlideDirection] = useState<SlideDirection>("left");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setCurrentView("main");
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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

  return {
    isOpen,
    setIsOpen,
    currentView,
    slideDirection,
    mounted,
    navigateTo,
    navigateBack,
    closeMenu,
  };
}
