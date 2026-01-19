"use client";

import { toast } from "sonner";
import { useI18n } from "../i18n";

import { ROUTER_PATHS } from "@/shared/constants/routes";
import {
  SignUpForm,
  AuthLayout,
  useGoogleAuth,
  GoogleSignInButton,
} from "@/features/auth";
import Link from "next/link";
import { useTimezone } from "@/shared/lib/use-timezone";
import { NutriAiLogo } from "@/shared/ui";

export function SignUpPage() {
  const { t } = useI18n();
  const timezone = useTimezone();

  const { handleGoogleLogin, isPending: isGooglePending } = useGoogleAuth({
    redirectTo: ROUTER_PATHS.DIARY,
    onSuccess: () => {
      toast.success("Successfully signed up with Google");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to sign up with Google");
    },
  });

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <NutriAiLogo width={140} height={35} />
          <p className="text-muted-foreground text-sm">{t("appTagline")}</p>
        </div>
        <AuthLayout
          title={t("title")}
          description={t("description")}
          footerText={
            <>
              {t("footerText")}{" "}
              <Link href={ROUTER_PATHS.SIGN_IN}>{t("signInLink")}</Link>
            </>
          }
          form={
            <GoogleSignInButton
              onSuccess={(credentialResponse) =>
                handleGoogleLogin(credentialResponse, timezone)
              }
              onError={() => {
                toast.error("Failed to sign up with Google");
              }}
              loading={isGooglePending}
            />
          }
          separatorText={t("or")}
          alternativeAuth={<SignUpForm disabled={isGooglePending} />}
        />
      </div>
    </div>
  );
}
