import { create } from "zustand";

export type Lang = "ru" | "en";

type LangStore = {
  isLoading: boolean;
  lang: Lang;
  loadLang: () => void;
  setLang: (lang: Lang) => void;
};

const getSystemLang = (): Lang => {
  if (typeof window === "undefined") return "ru";

  const browserLang = navigator.language.toLowerCase();

  if (browserLang.startsWith("en")) return "en";
  if (browserLang.startsWith("ru")) return "ru";

  return "ru";
};

export const useLang = create<LangStore>((set) => ({
  isLoading: true,
  lang: "ru",
  loadLang: () => {
    const savedLang = localStorage.getItem("lang") as Lang | null;
    const lang = savedLang ?? getSystemLang();
    set({ lang, isLoading: false });
  },
  setLang: (lang) => {
    localStorage.setItem("lang", lang);

    set({ lang });
  },
}));
