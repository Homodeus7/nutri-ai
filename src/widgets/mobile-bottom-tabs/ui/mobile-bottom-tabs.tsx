"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/shared/lib/css";
import { NAV_ITEMS } from "@/shared/constants/navigation";

export function MobileBottomTabs() {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "bg-[#1C1C1E] backdrop-blur-xl",
        "rounded-full p-1 shadow-2xl shadow-black/50",
        "mb-[env(safe-area-inset-bottom,0px)]",
      )}
    >
      <div className="flex items-center gap-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
                isActive
                  ? "bg-primary text-white"
                  : "bg-border text-zinc-500 hover:text-zinc-300 active:scale-95",
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isActive && "scale-110",
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
