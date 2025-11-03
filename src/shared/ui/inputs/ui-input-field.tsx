"use client";

import * as React from "react";
import { forwardRef } from "react";
import { Input } from "@/shared/ui/primitives/input";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/shared/ui/primitives/field";

export interface UiInputFieldProps
  extends Omit<React.ComponentProps<typeof Input>, "id"> {
  /**
   * Unique identifier for the input
   */
  id: string;
  /**
   * Label text
   */
  label: string;
  /**
   * Optional description text
   */
  description?: string;
  /**
   * Error message or array of error messages
   */
  error?: string | Array<{ message?: string } | undefined>;
  /**
   * Additional class for the Field container
   */
  fieldClassName?: string;
}

/**
 * Input field with label, optional description, and error handling
 *
 * @example
 * ```tsx
 * <UiInputField
 *   id="email"
 *   label="Email"
 *   type="email"
 *   placeholder="email@example.com"
 *   description="We'll never share your email"
 *   error="Please enter a valid email"
 * />
 * ```
 */
export const UiInputField = forwardRef<HTMLInputElement, UiInputFieldProps>(
  (
    { id, label, description, error, fieldClassName, className, ...inputProps },
    ref,
  ) => {
    const hasError = !!error;
    const errorArray = typeof error === "string" ? [{ message: error }] : error;

    return (
      <Field className={fieldClassName} data-invalid={hasError || undefined}>
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <Input
          id={id}
          ref={ref}
          aria-invalid={hasError || undefined}
          className={className}
          {...inputProps}
        />
        {description && !hasError && (
          <FieldDescription>{description}</FieldDescription>
        )}
        {hasError && <FieldError errors={errorArray} />}
      </Field>
    );
  },
);

UiInputField.displayName = "UiInputField";
