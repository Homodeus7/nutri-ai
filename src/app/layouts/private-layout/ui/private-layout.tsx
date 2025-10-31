import { UpdateLang } from "@/features/i18n";
import { UpdateTheme } from "@/features/theme";

export function PrivateLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <UpdateLang />
      <UpdateTheme />
      <main className="grow flex flex-col">{children}</main>
    </div>
  );
}
