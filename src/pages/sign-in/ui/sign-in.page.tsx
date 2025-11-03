"use client";

import { useForm } from "@tanstack/react-form";
import clsx from "clsx";
import { toast } from "sonner";
import { useI18n } from "../i18n";
import { FormInputField, FormPasswordInput } from "@/shared/ui/form";
import { signInSchema, useSignIn } from "@/features/auth/sign-in";
import { UiButton } from "@/shared/ui/ui-button";

export function SignInPage() {
  const { t } = useI18n();
  const { signIn, isPending } = useSignIn({
    redirectTo: "/",
    onSuccess: () => {
      toast.success("Successfully signed in!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to sign in");
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
        toast.error("Please fix the validation errors");
        return;
      }

      await signIn(result.data);
    },
  });

  return (
    <main className="grow flex flex-col pt-24">
      <div
        className={clsx(
          "rounded-xl border border-slate-300 px-14 py-8 pb-14 w-full max-w-[400px] bg-white self-center shadow-lg",
          "dark:border-slate-700 dark:bg-slate-800 dark:shadow-slate-700/30",
        )}
      >
        <h1 className="text-2xl mb-6 font-semibold">{t("title")}</h1>

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
                label="Email"
                type="email"
                placeholder="email@example.com"
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
                label="Password"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            )}
          </form.Field>

          <UiButton type="submit" className="w-full" loading={isPending}>
            Sign In
          </UiButton>
        </form>
      </div>
    </main>
  );
}
