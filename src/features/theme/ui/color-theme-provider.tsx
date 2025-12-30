"use client";

import { useColorTheme } from "../model/use-color-theme";

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  useColorTheme();
  return <>{children}</>;
}
