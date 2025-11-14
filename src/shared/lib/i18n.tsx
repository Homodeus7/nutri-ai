import { createStrictContext, useStrictContext } from "./react";

const langContext = createStrictContext<string>();

export function I18nProvider({
  lang,
  children,
}: {
  lang: string;
  children?: React.ReactNode;
}) {
  return <langContext.Provider value={lang}>{children}</langContext.Provider>;
}

export function createI18nModule<
  T extends Record<string, Record<string, string>>,
>(translations: T) {
  return function useI18n() {
    const lang = useStrictContext(langContext);

    return {
      t: (key: keyof T, params?: Record<string, string>) => {
        let translation = translations[key]?.[lang as string] ?? String(key);

        // Replace parameters in the format {paramName}
        if (params) {
          Object.entries(params).forEach(([paramKey, paramValue]) => {
            translation = translation.replace(
              new RegExp(`\\{${paramKey}\\}`, "g"),
              paramValue,
            );
          });
        }

        return translation;
      },
    };
  };
}
