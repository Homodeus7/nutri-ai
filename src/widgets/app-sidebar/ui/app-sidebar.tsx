"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Package, Zap, Utensils, Settings } from "lucide-react";
import { cn } from "@/shared/lib/css";
import { NutriAiLogo } from "@/shared/ui";
import { useI18n } from "../i18n";

type TranslateFn = (
  key: "lunch" | "products" | "appName" | "board" | "boost" | "more",
) => string;

const getNavItems = (t: TranslateFn) => [
  { name: t("board"), href: "/board", icon: Home },
  { name: t("products"), href: "/products", icon: Package },
  { name: t("boost"), href: "/boost", icon: Zap },
  { name: t("lunch"), href: "/lunch", icon: Utensils },
  { name: t("more"), href: "/more", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const navItems = getNavItems(t);

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col py-8 px-6 sticky top-0 h-screen">
      <div className="mb-12">
        <NutriAiLogo width={139} height={34} />
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
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
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
