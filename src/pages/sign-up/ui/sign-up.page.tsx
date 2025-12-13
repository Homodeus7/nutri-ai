"use client";

import { useI18n } from "../i18n";
import { SignUpForm, AuthLayout } from "@/features/auth";
import { ROUTER_PATHS } from "@/shared/constants";
import Link from "next/link";

export function SignUpPage() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col pt-24 items-center">
      <AuthLayout
        title={t("title")}
        description={t("description")}
        footerText={
          <>
            {t("footerText")}{" "}
            <Link href={ROUTER_PATHS.SIGN_IN}>{t("signInLink")}</Link>
          </>
        }
        form={<SignUpForm />}
      />
    </div>
  );
}
