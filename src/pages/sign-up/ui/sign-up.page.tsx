"use client";

import { toast } from "sonner";
import { useI18n } from "../i18n";
import {
  SignUpForm,
  AuthLayout,
  useGoogleAuth,
  GoogleSignInButton,
} from "@/features/auth";
import { ROUTER_PATHS } from "@/shared/constants";
import Link from "next/link";
import { useTimezone } from "@/shared/lib/use-timezone";

export function SignUpPage() {
  const { t } = useI18n();
  const timezone = useTimezone();

  const { handleGoogleLogin } = useGoogleAuth({
    redirectTo: ROUTER_PATHS.BOARD,
    onSuccess: () => {
      toast.success("Successfully signed up with Google");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to sign up with Google");
    },
  });

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
        separatorText={t("or")}
        alternativeAuth={
          <GoogleSignInButton
            onSuccess={(credentialResponse) =>
              handleGoogleLogin(credentialResponse, timezone)
            }
            onError={() => {
              toast.error("Failed to sign up with Google");
            }}
          />
        }
      />
    </div>
  );
}
