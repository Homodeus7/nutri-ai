"use client";

import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/shared/ui/primitives/dropdown-menu";
import { UiText } from "@/shared/ui/ui-text";
import { useI18n } from "../i18n";
import { SubmenuHeader } from "./submenu-header";

type Theme = "system" | "dark" | "light";

interface ThemeSubmenuViewProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  onBack: () => void;
}

export function ThemeSubmenuView({
  currentTheme,
  onThemeChange,
  onBack,
}: ThemeSubmenuViewProps) {
  const { t } = useI18n();

  const themeOptions: { value: Theme; label: string }[] = [
    { value: "system", label: t("themeSystem") },
    { value: "dark", label: t("themeDark") },
    { value: "light", label: t("themeLight") },
  ];

  return (
    <div className="py-1">
      <SubmenuHeader title={t("theme")} onBack={onBack} />
      <DropdownMenuSeparator />

      <div className="px-2 py-2">
        <UiText variant="muted" className="text-xs">
          {t("themeDescription")}
        </UiText>
      </div>

      <DropdownMenuRadioGroup
        value={currentTheme}
        onValueChange={(value) => onThemeChange(value as Theme)}
      >
        {themeOptions.map((option) => (
          <DropdownMenuRadioItem key={option.value} value={option.value}>
            {option.label}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
    </div>
  );
}
