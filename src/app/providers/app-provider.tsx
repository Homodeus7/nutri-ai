import { useLang } from "@/features/i18n";
import { I18nProvider } from "@/shared/lib/i18n";
import { ComposeChildren } from "@/shared/lib/react";
import { QueryProvider } from "@/shared/lib/react-query";
import { Toasts } from "@/shared/lib/toasts";

export function AppProvider({ children }: { children?: React.ReactNode }) {
  const { lang } = useLang();
  return (
    <ComposeChildren>
      <QueryProvider />
      <I18nProvider lang={lang} />
      <Toasts config={{ lifeTime: 3000 }} />
      {children}
    </ComposeChildren>
  );
}
