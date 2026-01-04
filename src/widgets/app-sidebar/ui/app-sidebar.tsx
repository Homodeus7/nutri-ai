"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/shared/lib/css";
import { NutriAiLogo } from "@/shared/ui";
import { NAV_ITEMS } from "@/shared/constants/navigation";
import { useI18n } from "../i18n";

export function AppSidebar() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <aside className="hidden md:flex w-64 bg-card border-r border-border flex-col py-8 px-6 sticky top-0 h-screen">
      <div className="mb-12">
        <Link href="/">
          <NutriAiLogo width={139} height={34} />
        </Link>
      </div>

      <nav className="flex flex-col gap-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 font-medium",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                  : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{t(item.key)}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
