import { create } from "zustand";

export type Lang = "ru" | "en";
export type LangPreference = "system" | Lang;

type LangStore = {
  isLoading: boolean;
  lang: Lang;
  langPreference: LangPreference;
  loadLang: () => void;
  setLang: (langPreference: LangPreference) => void;
};

const getSystemLang = (): Lang => {
  if (typeof window === "undefined") return "en";

  const browserLang = navigator.language.toLowerCase();

  if (browserLang.startsWith("en")) return "en";
  if (browserLang.startsWith("ru")) return "ru";

  return "en";
};

const resolveLang = (preference: LangPreference): Lang => {
  if (preference === "system") return getSystemLang();
  return preference;
};

export const useLang = create<LangStore>((set) => ({
  isLoading: true,
  lang: "en",
  langPreference: "system",
  loadLang: () => {
    const saved = localStorage.getItem("lang") as LangPreference | null;
    const langPreference = saved ?? "system";
    set({ lang: resolveLang(langPreference), langPreference, isLoading: false });
  },
  setLang: (langPreference) => {
    localStorage.setItem("lang", langPreference);
    set({ lang: resolveLang(langPreference), langPreference });
  },
}));
