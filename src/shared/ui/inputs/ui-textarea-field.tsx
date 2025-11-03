"use client";

import * as React from "react";
import { forwardRef } from "react";
import { Textarea } from "@/shared/ui/primitives/textarea";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/shared/ui/primitives/field";

export interface UiTextareaFieldProps
  extends Omit<React.ComponentProps<typeof Textarea>, "id"> {
  /**
   * Unique identifier for the textarea
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
 * Textarea field with label, optional description, and error handling
 *
 * @example
 * ```tsx
 * <UiTextareaField
 *   id="bio"
 *   label="Bio"
 *   placeholder="Tell us about yourself"
 *   description="Max 500 characters"
 * />
 * ```
 */
export const UiTextareaField = forwardRef<
  HTMLTextAreaElement,
  UiTextareaFieldProps
>(
  (
    {
      id,
      label,
      description,
      error,
      fieldClassName,
      className,
      ...textareaProps
    },
    ref,
  ) => {
    const hasError = !!error;
    const errorArray = typeof error === "string" ? [{ message: error }] : error;

    return (
      <Field className={fieldClassName} data-invalid={hasError || undefined}>
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <Textarea
          id={id}
          ref={ref}
          aria-invalid={hasError || undefined}
          className={className}
          {...textareaProps}
        />
        {description && !hasError && (
          <FieldDescription>{description}</FieldDescription>
        )}
        {hasError && <FieldError errors={errorArray} />}
      </Field>
    );
  },
);

UiTextareaField.displayName = "UiTextareaField";
