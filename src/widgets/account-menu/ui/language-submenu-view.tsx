"use client";

import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/shared/ui/primitives/dropdown-menu";
import type { LangPreference } from "@/features/i18n";
import { useI18n } from "../i18n";
import { SubmenuHeader } from "./submenu-header";

interface LanguageSubmenuViewProps {
  currentLang: LangPreference;
  onLangChange: (lang: LangPreference) => void;
  onBack: () => void;
}

export function LanguageSubmenuView({
  currentLang,
  onLangChange,
  onBack,
}: LanguageSubmenuViewProps) {
  const { t } = useI18n();

  const langOptions: { value: LangPreference; label: string }[] = [
    { value: "system", label: t("langSystem") },
    { value: "en", label: t("langEn") },
    { value: "ru", label: t("langRu") },
  ];

  return (
    <div className="py-1">
      <SubmenuHeader title={t("language")} onBack={onBack} />
      <DropdownMenuSeparator />

      <DropdownMenuRadioGroup
        value={currentLang}
        onValueChange={(value) => onLangChange(value as LangPreference)}
      >
        {langOptions.map((option) => (
          <DropdownMenuRadioItem key={option.value} value={option.value}>
            {option.label}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
    </div>
  );
}
