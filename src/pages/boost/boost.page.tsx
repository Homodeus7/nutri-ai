"use client";

import { UiText } from "@/shared/ui/ui-text";
import { useI18n } from "./i18n";

export function BoostPage() {
  const { t } = useI18n();

  return (
    <>
      <UiText variant="h1" weight="bold" className="mb-8">
        {t("title")}
      </UiText>
      <UiText variant="muted">{t("description")}</UiText>
    </>
  );
}
