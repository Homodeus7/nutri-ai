"use client";

import * as React from "react";
import type { FieldApi } from "@tanstack/react-form";
import { UiInputField, type UiInputFieldProps } from "../inputs/ui-input-field";

export interface FormInputFieldProps
  extends Omit<UiInputFieldProps, "error" | "value" | "onChange" | "onBlur"> {
  /**
   * TanStack Form field API instance
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>;
}

/**
 * TanStack Form wrapper for UiInputField
 * Automatically handles value, onChange, onBlur and error state
 *
 * @example
 * ```tsx
 * <form.Field name="email">
 *   {(field) => (
 *     <FormInputField
 *       field={field}
 *       id="email"
 *       label="Email"
 *       type="email"
 *       placeholder="email@example.com"
 *     />
 *   )}
 * </form.Field>
 * ```
 */
export const FormInputField = React.forwardRef<
  HTMLInputElement,
  FormInputFieldProps
>(({ field, ...props }, ref) => {
  // Convert TanStack Form errors (string[]) to the format expected by UiInputField
  const errors =
    field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? field.state.meta.errors.map((error: string) => ({
          message: typeof error === "string" ? error : String(error),
        }))
      : undefined;

  return (
    <UiInputField
      ref={ref}
      value={field.state.value ?? ""}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      error={errors}
      {...props}
    />
  );
});

FormInputField.displayName = "FormInputField";
