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
  InputGroupText,
} from "@/shared/ui/primitives/input-group";
import type { UiInputFieldProps } from "./ui-input-field";

export interface UiInputWithPrefixProps
  extends Omit<UiInputFieldProps, "className"> {
  /**
   * Prefix text (e.g., "https://", "$")
   */
  prefix?: string;
  /**
   * Suffix text (e.g., ".com", "USD")
   */
  suffix?: string;
  /**
   * Additional class for the input
   */
  inputClassName?: string;
}

/**
 * Input field with text prefix and/or suffix
 *
 * @example
 * ```tsx
 * <UiInputWithPrefix
 *   id="website"
 *   label="Website"
 *   prefix="https://"
 *   suffix=".com"
 *   placeholder="example"
 * />
 * ```
 */
export const UiInputWithPrefix = forwardRef<
  HTMLInputElement,
  UiInputWithPrefixProps
>(
  (
    {
      id,
      label,
      description,
      error,
      fieldClassName,
      inputClassName,
      prefix,
      suffix,
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
          {prefix && (
            <InputGroupAddon>
              <InputGroupText>{prefix}</InputGroupText>
            </InputGroupAddon>
          )}
          <InputGroupInput
            id={id}
            ref={ref}
            aria-invalid={hasError || undefined}
            className={inputClassName}
            {...inputProps}
          />
          {suffix && (
            <InputGroupAddon align="inline-end">
              <InputGroupText>{suffix}</InputGroupText>
            </InputGroupAddon>
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

UiInputWithPrefix.displayName = "UiInputWithPrefix";
