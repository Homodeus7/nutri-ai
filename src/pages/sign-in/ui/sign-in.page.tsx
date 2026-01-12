"use client";

import { toast } from "sonner";
import { useI18n } from "../i18n";
import { ROUTER_PATHS } from "@/shared/constants/routes";
import {
  SignInForm,
  AuthLayout,
  useGoogleAuth,
  GoogleSignInButton,
} from "@/features/auth";
import Link from "next/link";
import { useTimezone } from "@/shared/lib/use-timezone";

export function SignInPage() {
  const { t } = useI18n();
  const timezone = useTimezone();

  const { handleGoogleLogin } = useGoogleAuth({
    redirectTo: ROUTER_PATHS.DIARY,
    onSuccess: () => {
      toast.success("Successfully signed in with Google");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to sign in with Google");
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
            <Link href={ROUTER_PATHS.SIGN_UP}>{t("signUpLink")}</Link>
          </>
        }
        form={<SignInForm />}
        separatorText={t("or")}
        alternativeAuth={
          <GoogleSignInButton
            onSuccess={(credentialResponse) =>
              handleGoogleLogin(credentialResponse, timezone)
            }
            onError={() => {
              toast.error("Failed to sign in with Google");
            }}
          />
        }
      />
    </div>
  );
}
