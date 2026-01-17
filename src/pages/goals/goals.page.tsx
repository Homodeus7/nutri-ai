"use client";

import { UiText } from "@/shared/ui/ui-text";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/primitives/card";
import { UpdateGoalsForm } from "@/features/goals";
import { useI18n } from "./i18n";

export function GoalsPage() {
  const { t } = useI18n();

  return (
    <>
      <div>
        <UiText variant="h1" weight="bold">
          {t("title")}
        </UiText>
        <UiText variant="muted" className="pt-4">
          {t("description")}
        </UiText>
      </div>

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateGoalsForm />
        </CardContent>
      </Card>
    </>
  );
}
