import { useLang } from "@/features/i18n";
import { I18nProvider } from "@/shared/lib/i18n";
import { QueryProvider } from "@/shared/lib/react-query";
import { MSWProvider } from "@/shared/lib/msw";
import { Toaster } from "@/shared/ui/primitives/sonner";
import { ThemeProvider } from "next-themes";
import { GoogleOAuthProvider } from "@react-oauth/google";

export function AppProvider({ children }: { children?: React.ReactNode }) {
  const { lang } = useLang();
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  return (
    <MSWProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        storageKey="theme"
      >
        <Toaster />
        <QueryProvider>
          <GoogleOAuthProvider clientId={googleClientId}>
            <I18nProvider lang={lang}>{children}</I18nProvider>
          </GoogleOAuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </MSWProvider>
  );
}
