import { cn } from "@/shared/lib/css";
import type { MenuView, SlideDirection } from "../model/types";

const BASE_CLASSES = "transition-all duration-200 ease-in-out";
const ACTIVE_CLASSES = "translate-x-0 opacity-100";
const HIDDEN_CLASSES = "absolute inset-0 pointer-events-none opacity-0";

export function getSlideClasses(
  targetView: MenuView,
  currentView: MenuView,
  slideDirection: SlideDirection
): string {
  if (currentView === targetView) {
    return cn(BASE_CLASSES, ACTIVE_CLASSES);
  }

  const translateClass =
    slideDirection === "left" ? "translate-x-full" : "-translate-x-full";

  return cn(BASE_CLASSES, HIDDEN_CLASSES, translateClass);
}

export function getMainViewClasses(
  currentView: MenuView,
  slideDirection: SlideDirection
): string {
  if (currentView === "main") {
    return cn(BASE_CLASSES, ACTIVE_CLASSES);
  }

  return cn(BASE_CLASSES, HIDDEN_CLASSES, "-translate-x-full");
}
