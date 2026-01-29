"use client";

import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/shared/ui/primitives/dropdown-menu";
import type { ColorTheme } from "@/features/theme";
import { useI18n } from "../i18n";
import { SubmenuHeader } from "./submenu-header";
import { ColorDot } from "./color-dot";

interface ColorThemeSubmenuViewProps {
  currentColorTheme: ColorTheme | null;
  onColorThemeChange: (colorTheme: ColorTheme) => void;
  onBack: () => void;
}

export function ColorThemeSubmenuView({
  currentColorTheme,
  onColorThemeChange,
  onBack,
}: ColorThemeSubmenuViewProps) {
  const { t } = useI18n();

  const colorOptions: { value: ColorTheme; label: string }[] = [
    { value: "orange", label: t("colorOrange") },
    { value: "blue", label: t("colorBlue") },
    { value: "green", label: t("colorGreen") },
    { value: "red", label: t("colorRed") },
    { value: "purple", label: t("colorPurple") },
    { value: "pink", label: t("colorPink") },
    { value: "yellow", label: t("colorYellow") },
  ];

  return (
    <div className="py-1">
      <SubmenuHeader title={t("colorTheme")} onBack={onBack} />
      <DropdownMenuSeparator />

      <DropdownMenuRadioGroup
        value={currentColorTheme || "orange"}
        onValueChange={(value) => onColorThemeChange(value as ColorTheme)}
      >
        {colorOptions.map((option) => (
          <DropdownMenuRadioItem
            key={option.value}
            value={option.value}
            className="gap-3"
          >
            <ColorDot color={option.value} />
            {option.label}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
    </div>
  );
}
