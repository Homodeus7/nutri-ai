import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useLang, type LangPreference } from "@/features/i18n";
import { useColorTheme, type ColorTheme, type Theme } from "@/features/theme";
import { usePreferences, useUpdatePreferences } from "./use-preferences";

export function useSyncPreferences() {
  const { data: serverPrefs, isSuccess } = usePreferences();
  const { updatePreferences } = useUpdatePreferences();
  const { setTheme } = useTheme();
  const { setLang } = useLang();
  const { setColorTheme } = useColorTheme();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (!isSuccess || hasSynced.current) return;
    hasSynced.current = true;

    const hasServerData =
      serverPrefs?.theme || serverPrefs?.colorTheme || serverPrefs?.lang;

    if (hasServerData) {
      // Server has data — apply to client
      if (serverPrefs.theme) {
        setTheme(serverPrefs.theme);
      }
      if (serverPrefs.colorTheme) {
        setColorTheme(serverPrefs.colorTheme);
      }
      if (serverPrefs.lang) {
        setLang(serverPrefs.lang);
      }
    } else {
      // Server is empty (first login) — push local settings to server
      const localTheme = localStorage.getItem("theme") || "system";
      const localColorTheme = localStorage.getItem("color-theme") || "orange";
      const localLang = localStorage.getItem("lang") || "system";

      updatePreferences({
        theme: localTheme as Theme,
        colorTheme: localColorTheme as ColorTheme,
        lang: localLang as LangPreference,
      });
    }
  }, [
    isSuccess,
    serverPrefs,
    setTheme,
    setColorTheme,
    setLang,
    updatePreferences,
  ]);
}
