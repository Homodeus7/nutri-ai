"use client";

import { type LangPreference, useLang } from "../model/lang.store";
import { UiSelect } from "@/shared/ui";
import { useEffect } from "react";

type LangOption = {
  id: LangPreference;
  label: string;
};

const langOptions: LangOption[] = [
  { id: "system", label: "Auto" },
  { id: "en", label: "En" },
  { id: "ru", label: "Ru" },
];

export function UpdateLang({ className }: { className?: string }) {
  const { langPreference, setLang, loadLang } = useLang();

  useEffect(() => {
    loadLang();
  }, [loadLang]);

  const langOption = langOptions.find((option) => option.id === langPreference);
  const onChangeLang = (lang: LangOption) => {
    setLang(lang.id);
  };

  return (
    <UiSelect
      className={className}
      options={langOptions}
      value={langOption}
      onChange={onChangeLang}
      getLabel={(option) => option.label}
    />
  );
}
