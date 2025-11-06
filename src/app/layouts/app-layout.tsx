import { useTheme } from "@/features/theme";
import clsx from "clsx";

export function AppLayout({ children }: { children?: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <div className={clsx(theme, "bg-background text-foreground min-h-screen")}>
      {children}
    </div>
  );
}
