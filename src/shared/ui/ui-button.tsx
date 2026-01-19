"use client";

import * as React from "react";
import { forwardRef } from "react";
import { Button, buttonVariants } from "@/shared/ui/primitives/button";
import { Spinner } from "@/shared/ui/primitives/spinner";
import type { VariantProps } from "class-variance-authority";

export interface UiButtonProps
  extends React.ComponentProps<typeof Button>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
}

export const UiButton = forwardRef<HTMLButtonElement, UiButtonProps>(
  ({ children, icon, loading = false, disabled, className, ...props }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <Button ref={ref} disabled={isDisabled} className={className} {...props}>
        {loading ? <Spinner className="size-4" /> : icon}
        {children}
      </Button>
    );
  },
);

UiButton.displayName = "UiButton";
