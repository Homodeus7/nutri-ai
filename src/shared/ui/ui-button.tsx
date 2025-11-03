"use client";

import * as React from "react";
import { forwardRef } from "react";
import { Button, buttonVariants } from "@/shared/ui/primitives/button";
import { Spinner } from "@/shared/ui/primitives/spinner";
import type { VariantProps } from "class-variance-authority";

export interface UiButtonProps
  extends React.ComponentProps<typeof Button>,
    VariantProps<typeof buttonVariants> {
  /**
   * Loading state - shows spinner and disables the button
   */
  loading?: boolean;
  /**
   * Icon component (from lucide-react or any React component)
   */
  icon?: React.ReactNode;
}

/**
 * Universal button component with loading state support
 *
 * @example
 * ```tsx
 * <UiButton>Click me</UiButton>
 * ```
 *
 * @example
 * ```tsx
 * <UiButton loading>Loading...</UiButton>
 * ```
 *
 * @example
 * ```tsx
 * <UiButton variant="destructive" size="lg">
 *   Delete
 * </UiButton>
 * ```
 */
export const UiButton = forwardRef<HTMLButtonElement, UiButtonProps>(
  ({ children, icon, loading = false, disabled, className, ...props }, ref) => {
    const isDisabled = disabled || loading;

    const renderContent = () => {
      if (loading) {
        return <Spinner className="size-4" />;
      }

      return (
        <>
          {icon && { icon }}
          {children}
        </>
      );
    };

    return (
      <Button ref={ref} disabled={isDisabled} className={className} {...props}>
        {renderContent()}
      </Button>
    );
  },
);

UiButton.displayName = "UiButton";
