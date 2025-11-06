import { UpdateLang } from "@/features/i18n/";
import { UpdateTheme } from "@/features/theme";

export function OpenLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <UpdateLang />
      <UpdateTheme />
      <main className="grow flex flex-col">{children}</main>
    </div>
  );
}
