"use client";

import { UiButton } from "@/shared/ui/ui-button";
import { UiText } from "@/shared/ui/ui-text";
import { Bell, Crown } from "lucide-react";
import { useI18n } from "../i18n";

export function AppHeader() {
  const { t } = useI18n();

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="px-8 py-4 flex items-center justify-end">
        <div className="flex items-center gap-4">
          <UiText variant="muted">{t("dashboard")}</UiText>
          <div className="flex gap-2">
            <UiButton variant="ghost" size="icon">
              <Crown className="w-5 h-5" />
            </UiButton>
            <UiButton variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </UiButton>
          </div>
        </div>
      </div>
    </header>
  );
}
