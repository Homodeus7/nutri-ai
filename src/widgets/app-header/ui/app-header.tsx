"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { NutriAiLogo, Skeleton } from "@/shared/ui";
import { ROUTER_PATHS } from "@/shared/constants/routes";

const AccountMenu = dynamic(
  () => import("@/widgets/account-menu").then((mod) => mod.AccountMenu),
  { loading: () => <Skeleton className="h-9 w-9 rounded-full" /> },
);

export function AppHeader() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="px-8 py-4 flex items-center justify-between xl:justify-end">
        <div className="xl:hidden">
          <Link href={ROUTER_PATHS.DIARY}>
            <NutriAiLogo width={100} height={24} />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <AccountMenu />
            {/* <UiButton variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </UiButton> */}
          </div>
        </div>
      </div>
    </header>
  );
}
