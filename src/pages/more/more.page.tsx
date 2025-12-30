"use client";

import { UiText } from "@/shared/ui/ui-text";
import { useI18n } from "./i18n";
import { UiButton } from "@/shared/ui";
import { Settings } from "lucide-react";
import { UpdateColorTheme, UpdateTheme } from "@/features/theme";
import { UpdateLang } from "@/features/i18n";
import { LogoutButton } from "@/features/auth";

export function MorePage() {
  const { t } = useI18n();

  return (
    <>
      <UiText variant="h1" weight="bold" className="mb-8">
        {t("title")}
      </UiText>
      <UiText variant="muted">{t("description")}</UiText>
      <div className="mt-auto mb-4 flex flex-col gap-4 items-start">
        <UiButton variant="default" size="icon">
          <Settings className="w-6 h-6" />
        </UiButton>

        <UpdateTheme className="w-full" />

        <UpdateColorTheme />
        <UpdateLang />
        <LogoutButton />
      </div>
    </>
  );
}
