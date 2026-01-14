"use client";

import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/shared/ui/primitives/dropdown-menu";
import { useI18n } from "../i18n";
import { SubmenuHeader } from "./submenu-header";

type Lang = "ru" | "en";

interface LanguageSubmenuViewProps {
  currentLang: Lang;
  onLangChange: (lang: Lang) => void;
  onBack: () => void;
}

export function LanguageSubmenuView({
  currentLang,
  onLangChange,
  onBack,
}: LanguageSubmenuViewProps) {
  const { t } = useI18n();

  const langOptions: { value: Lang; label: string }[] = [
    { value: "en", label: t("langEn") },
    { value: "ru", label: t("langRu") },
  ];

  return (
    <div className="py-1">
      <SubmenuHeader title={t("language")} onBack={onBack} />
      <DropdownMenuSeparator />

      <DropdownMenuRadioGroup
        value={currentLang}
        onValueChange={(value) => onLangChange(value as Lang)}
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
