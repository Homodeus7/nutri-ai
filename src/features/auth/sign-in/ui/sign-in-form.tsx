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
import { useSignIn } from "../model/use-sign-in";
import { useI18n } from "../i18n";
import { ROUTER_PATHS } from "@/shared/constants/routes";
import { useTimezone } from "@/shared/lib/use-timezone";

export function SignInForm() {
  const { t } = useI18n();
  const timezone = useTimezone();

  // Zod schema with i18n translations
  const signInSchema = z.object({
    email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
    password: z
      .string()
      .min(1, t("passwordRequired"))
      .min(8, t("passwordMinLength")),
  });

  type SignInFormData = z.infer<typeof signInSchema>;

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signIn, isPending } = useSignIn({
    redirectTo: ROUTER_PATHS.DIARY,
    onSuccess: () => {
      toast.success(t("successMessage"));
    },
    onError: (error) => {
      toast.error(error.message || t("errorMessage"));
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    signIn({ ...data, timezone });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <fieldset disabled={isPending} className="space-y-4">
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("passwordLabel")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("passwordPlaceholder")}
                    autoComplete="current-password"
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
