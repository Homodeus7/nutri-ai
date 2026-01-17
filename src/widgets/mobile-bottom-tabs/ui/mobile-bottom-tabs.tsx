"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/css";
import { NAV_ITEMS } from "@/shared/constants/navigation";
import { useI18n } from "../i18n";
import { NavLinkButton } from "./nav-link-button";

export function MobileBottomTabs() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <nav
      aria-label={t("navigation")}
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "bg-[#1C1C1E] backdrop-blur-xl",
        "rounded-full p-1 md:p-1.5 shadow-2xl shadow-black/50",
        "mb-[env(safe-area-inset-bottom,0px)]",
      )}
    >
      <div className="flex items-center gap-2 md:gap-2.5" role="list">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <NavLinkButton
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={t(item.key)}
              isActive={isActive}
            />
          );
        })}
      </div>
    </nav>
  );
}
