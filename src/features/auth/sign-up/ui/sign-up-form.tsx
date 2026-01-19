"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/primitives/form";
import { Input } from "@/shared/ui/primitives/input";
import { UiButton } from "@/shared/ui/ui-button";
import { useSignUp } from "../model/use-sign-up";
import { useI18n } from "../i18n";
import { ROUTER_PATHS } from "@/shared/constants/routes";
import { useTimezone } from "@/shared/lib/use-timezone";

export interface SignUpFormProps {
  disabled?: boolean;
}

export function SignUpForm({ disabled }: SignUpFormProps = {}) {
  const { t } = useI18n();
  const timezone = useTimezone();

  // Zod schema with i18n translations
  const signUpSchema = z
    .object({
      email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
      password: z
        .string()
        .min(1, t("passwordRequired"))
        .min(8, t("passwordMinLength")),
      confirmPassword: z.string().min(1, t("confirmPasswordRequired")),
      displayName: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });

  type SignUpFormData = z.infer<typeof signUpSchema>;

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      displayName: "",
    },
  });

  const { signUp, isPending } = useSignUp({
    redirectTo: ROUTER_PATHS.DIARY,
    onSuccess: () => {
      toast.success(t("successMessage"));
    },
    onError: (error) => {
      toast.error(error.message || t("errorMessage"));
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    signUp({ ...data, timezone });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <fieldset disabled={isPending || disabled} className="space-y-4 md:space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("emailLabel")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("displayNameLabel")}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t("displayNamePlaceholder")}
                    autoComplete="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("passwordLabel")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("passwordPlaceholder")}
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("confirmPasswordLabel")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("confirmPasswordPlaceholder")}
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <UiButton type="submit" className="w-full" loading={isPending}>
            {t("submitButton")}
          </UiButton>
        </fieldset>
      </form>
    </Form>
  );
}
