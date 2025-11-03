"use client";

import * as React from "react";
import { forwardRef } from "react";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/shared/ui/primitives/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/shared/ui/primitives/input-group";
import type { UiInputFieldProps } from "./ui-input-field";

export interface UiInputWithIconProps
  extends Omit<UiInputFieldProps, "className"> {
  /**
   * Icon component (from lucide-react or any React component)
   */
  icon: React.ReactNode;
  /**
   * Icon position
   */
  iconPosition?: "start" | "end";
  /**
   * Additional class for the input
   */
  inputClassName?: string;
}

/**
 * Input field with icon
 *
 * @example
 * ```tsx
 * import { Mail } from "lucide-react";
 *
 * <UiInputWithIcon
 *   id="email"
 *   label="Email"
 *   type="email"
 *   icon={<Mail className="size-4" />}
 *   placeholder="email@example.com"
 * />
 * ```
 */
export const UiInputWithIcon = forwardRef<
  HTMLInputElement,
  UiInputWithIconProps
>(
  (
    {
      id,
      label,
      description,
      error,
      fieldClassName,
      inputClassName,
      icon,
      iconPosition = "start",
      ...inputProps
    },
    ref,
  ) => {
    const hasError = !!error;
    const errorArray = typeof error === "string" ? [{ message: error }] : error;

    return (
      <Field className={fieldClassName} data-invalid={hasError || undefined}>
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <InputGroup>
          {iconPosition === "start" && (
            <InputGroupAddon>{icon}</InputGroupAddon>
          )}
          <InputGroupInput
            id={id}
            ref={ref}
            aria-invalid={hasError || undefined}
            className={inputClassName}
            {...inputProps}
          />
          {iconPosition === "end" && (
            <InputGroupAddon align="inline-end">{icon}</InputGroupAddon>
          )}
        </InputGroup>
        {description && !hasError && (
          <FieldDescription>{description}</FieldDescription>
        )}
        {hasError && <FieldError errors={errorArray} />}
      </Field>
    );
  },
);

UiInputWithIcon.displayName = "UiInputWithIcon";
