"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { FormInputField, FormPasswordInput } from "@/shared/ui/form";
import { createSignInSchema } from "../model/sign-in.schema";
import { useSignIn } from "../model/use-sign-in";
import { UiButton } from "@/shared/ui/ui-button";
import { UiCardLayout } from "@/shared/ui/ui-card-layout";
import { UiTypography } from "@/shared/ui/ui-typography";
import { useI18n } from "../i18n";
import { ROUTER_PATHS } from "@/shared/constants";

interface SignInFormProps {
  title: string;
}

export function SignInForm({ title }: SignInFormProps) {
  const { t } = useI18n();
  const signInSchema = createSignInSchema();
  const { signIn, isPending } = useSignIn({
    redirectTo: ROUTER_PATHS.BOARD,
    onSuccess: () => {
      toast.success(t("successMessage"));
      console.log("User signed in");
    },
    onError: (error) => {
      toast.error(error.message || t("errorMessage"));
      console.log("Sign-in error:", error);
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      // Validate with Zod before submission
      const result = signInSchema.safeParse(value);
      if (!result.success) {
        toast.error(t("validationError"));
        return;
      }

      await signIn(result.data);
    },
  });

  return (
    <UiCardLayout
      header={{
        title: <UiTypography variant="h3">{title}</UiTypography>,
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              const result = signInSchema.shape.email.safeParse(value);
              return result.success
                ? undefined
                : result.error.errors[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormInputField
              field={field}
              id="email"
              label={t("emailLabel")}
              type="email"
              placeholder={t("emailPlaceholder")}
              autoComplete="email"
            />
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) => {
              const result = signInSchema.shape.password.safeParse(value);
              return result.success
                ? undefined
                : result.error.errors[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormPasswordInput
              field={field}
              id="password"
              label={t("passwordLabel")}
              placeholder={t("passwordPlaceholder")}
              autoComplete="current-password"
            />
          )}
        </form.Field>

        <UiButton type="submit" className="w-full" loading={isPending}>
          {t("submitButton")}
        </UiButton>
      </form>
    </UiCardLayout>
  );
}
