"use client";

import { useI18n } from "../i18n";
import { SignInForm } from "@/features/auth/sign-in";

export function SignInPage() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col pt-24 items-center">
      <SignInForm title={t("title")} />
    </div>
  );
}
