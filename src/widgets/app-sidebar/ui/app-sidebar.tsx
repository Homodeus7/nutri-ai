"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Square, Zap, Utensils, Settings } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { UpdateLang } from "@/features/i18n";
import { UpdateTheme } from "@/features/theme";
import { UiText } from "@/shared/ui/ui-text";
import { UiButton } from "@/shared/ui/ui-button";
import { useI18n } from "../i18n";

type TranslateFn = (key: "lunch" | "meals" | "appName" | "board" | "boost" | "more") => string;

const getNavItems = (t: TranslateFn) => [
  { name: t("board"), href: "/board", icon: Home, color: "bg-orange-500" },
  { name: t("meals"), href: "/meals", icon: Square, color: "bg-blue-500" },
  { name: t("boost"), href: "/boost", icon: Zap, color: "bg-yellow-500" },
  { name: t("lunch"), href: "/lunch", icon: Utensils, color: "bg-green-500" },
  { name: t("more"), href: "/more", icon: Settings, color: "bg-purple-500" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const navItems = getNavItems(t);

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col py-8 px-6 sticky top-0 h-screen">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
          NA
        </div>
        <UiText variant="h4" weight="bold" className="text-white">
          {t("appName")}
        </UiText>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 font-medium",
                isActive
                  ? `${item.color} text-white shadow-lg`
                  : "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white",
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto mb-4 flex flex-col gap-4 items-start">
        <UiButton
          variant="ghost"
          size="icon"
          className="bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white"
        >
          <Settings className="w-6 h-6" />
        </UiButton>
        <div className="w-full">
          <UpdateTheme className="w-full" />
        </div>
        <UpdateLang />
      </div>
    </aside>
  );
}
