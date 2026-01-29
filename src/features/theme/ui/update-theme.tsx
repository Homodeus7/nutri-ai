"use client";

import { useTheme } from "next-themes";
import { UiSelect } from "@/shared/ui";
import { useEffect, useState } from "react";
import type { Theme } from "../model/types";

type ThemeOption = {
  id: Theme;
  label: string;
};

const themeOptions: ThemeOption[] = [
  { id: "system", label: "System" },
  { id: "dark", label: "Dark" },
  { id: "light", label: "Light" },
];

export function UpdateTheme({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themeOption = themeOptions.find((option) => option.id === theme);
  const onChangeTheme = (theme: ThemeOption) => {
    setTheme(theme.id);
  };

  return (
    <UiSelect
      className={className}
      options={themeOptions}
      value={themeOption}
      onChange={onChangeTheme}
      getLabel={(option) => option.label}
    />
  );
}
