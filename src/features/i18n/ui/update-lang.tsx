"use client";

import { Lang, useLang } from "../model/lang.store";
import { UiSelect } from "@/shared/ui";
import { useEffect } from "react";

type LangOption = {
  id: Lang;
  label: string;
};

const langOptions: LangOption[] = [
  { id: "en", label: "En" },
  { id: "ru", label: "Ru" },
];

export function UpdateLang({ className }: { className?: string }) {
  const { lang, setLang, loadLang } = useLang();

  useEffect(() => {
    loadLang();
  }, [loadLang]);

  const langOption = langOptions.find((option) => option.id === lang);
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
