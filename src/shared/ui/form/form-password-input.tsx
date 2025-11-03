"use client";

import * as React from "react";
import type { FieldApi } from "@tanstack/react-form";
import {
  UiPasswordInput,
  type UiPasswordInputProps,
} from "../inputs/ui-password-input";

export interface FormPasswordInputProps
  extends Omit<
    UiPasswordInputProps,
    "error" | "value" | "onChange" | "onBlur"
  > {
  /**
   * TanStack Form field API instance
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>;
}

/**
 * TanStack Form wrapper for UiPasswordInput
 * Automatically handles value, onChange, onBlur and error state
 *
 * @example
 * ```tsx
 * <form.Field name="password">
 *   {(field) => (
 *     <FormPasswordInput
 *       field={field}
 *       id="password"
 *       label="Password"
 *       placeholder="Enter your password"
 *     />
 *   )}
 * </form.Field>
 * ```
 */
export const FormPasswordInput = React.forwardRef<
  HTMLInputElement,
  FormPasswordInputProps
>(({ field, ...props }, ref) => {
  // Convert TanStack Form errors (string[]) to the format expected by UiPasswordInput
  const errors =
    field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? field.state.meta.errors.map((error: string) => ({
          message: typeof error === "string" ? error : String(error),
        }))
      : undefined;

  return (
    <UiPasswordInput
      ref={ref}
      value={field.state.value ?? ""}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      error={errors}
      {...props}
    />
  );
});

FormPasswordInput.displayName = "FormPasswordInput";
