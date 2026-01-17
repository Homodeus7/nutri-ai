"use client";

import { UiText } from "@/shared/ui/ui-text";
import { useI18n } from "./i18n";

export function LunchPage() {
  const { t } = useI18n();

  return (
    <>
      <UiText variant="h1" weight="bold">
        {t("title")}
      </UiText>
      <UiText variant="muted">{t("description")}</UiText>
    </>
  );
}
