"use client";

import { UiSelect } from "@/shared/ui";
import { useColorTheme, type ColorTheme } from "../model/use-color-theme";

type ColorThemeOption = {
  id: ColorTheme;
  label: string;
};

const colorThemeOptions: ColorThemeOption[] = [
  { id: "orange", label: "Orange" },
  { id: "blue", label: "Blue" },
  { id: "green", label: "Green" },
  { id: "red", label: "Red" },
  { id: "purple", label: "Purple" },
  { id: "pink", label: "Pink" },
  { id: "yellow", label: "Yellow" },
];

export function UpdateColorTheme({ className }: { className?: string }) {
  const { colorTheme, setColorTheme, mounted } = useColorTheme();

  if (!mounted || !colorTheme) {
    return null;
  }

  const colorThemeOption = colorThemeOptions.find(
    (option) => option.id === colorTheme
  );

  const onChangeColorTheme = (theme: ColorThemeOption) => {
    setColorTheme(theme.id);
  };

  return (
    <UiSelect
      className={className}
      options={colorThemeOptions}
      value={colorThemeOption}
      onChange={onChangeColorTheme}
      getLabel={(option) => option.label}
    />
  );
}
