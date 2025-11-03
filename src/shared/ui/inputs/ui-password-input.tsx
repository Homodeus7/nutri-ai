"use client";

import * as React from "react";
import { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";
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
  InputGroupButton,
} from "@/shared/ui/primitives/input-group";
import type { UiInputFieldProps } from "./ui-input-field";

export interface UiPasswordInputProps extends Omit<UiInputFieldProps, "type"> {
  /**
   * Show password by default
   */
  defaultShowPassword?: boolean;
}

/**
 * Password input with toggle visibility button
 *
 * @example
 * ```tsx
 * <UiPasswordInput
 *   id="password"
 *   label="Password"
 *   placeholder="Enter your password"
 *   description="Must be at least 8 characters"
 * />
 * ```
 */
export const UiPasswordInput = forwardRef<
  HTMLInputElement,
  UiPasswordInputProps
>(
  (
    {
      id,
      label,
      description,
      error,
      fieldClassName,
      className,
      defaultShowPassword = false,
      ...inputProps
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(defaultShowPassword);
    const hasError = !!error;
    const errorArray = typeof error === "string" ? [{ message: error }] : error;

    return (
      <Field className={fieldClassName} data-invalid={hasError || undefined}>
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id={id}
            ref={ref}
            type={showPassword ? "text" : "password"}
            aria-invalid={hasError || undefined}
            className={className}
            {...inputProps}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="size-3.5" />
              ) : (
                <Eye className="size-3.5" />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        {description && !hasError && (
          <FieldDescription>{description}</FieldDescription>
        )}
        {hasError && <FieldError errors={errorArray} />}
      </Field>
    );
  },
);

UiPasswordInput.displayName = "UiPasswordInput";
