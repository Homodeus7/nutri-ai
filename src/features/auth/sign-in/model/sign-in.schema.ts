import { z } from "zod";
import { useI18n } from "../i18n";

/**
 * Sign-in form validation schema factory
 * Creates schema with translated error messages
 */
export const createSignInSchema = () => {
  const { t } = useI18n();

  return z.object({
    email: z
      .string()
      .min(1, t("emailRequired"))
      .email(t("emailInvalid")),
    password: z
      .string()
      .min(1, t("passwordRequired"))
      .min(8, t("passwordMinLength")),
  });
};

/**
 * Sign-in form validation schema with English messages (for server-side usage)
 */
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type SignInFormData = z.infer<typeof signInSchema>;
