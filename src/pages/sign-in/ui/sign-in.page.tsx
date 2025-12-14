"use client";

import { useI18n } from "../i18n";
import { SignInForm, AuthLayout } from "@/features/auth";
import { ROUTER_PATHS } from "@/shared/constants/routes";
import Link from "next/link";

export function SignInPage() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col pt-24 items-center">
      <AuthLayout
        title={t("title")}
        description={t("description")}
        footerText={
          <>
            {t("footerText")}{" "}
            <Link href={ROUTER_PATHS.SIGN_UP}>{t("signUpLink")}</Link>
          </>
        }
        form={<SignInForm />}
      />
    </div>
  );
}
