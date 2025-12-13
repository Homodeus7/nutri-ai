import * as React from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/primitives/card";

interface UiCardLayoutProps extends React.ComponentProps<typeof Card> {
  header?: {
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: React.ReactNode;
  };
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function UiCardLayout({
  header,
  children,
  footer,
  ...props
}: UiCardLayoutProps) {
  return (
    <Card {...props} className="w-full sm:max-w-md">
      {header && (
        <CardHeader>
          {header.title && <CardTitle>{header.title}</CardTitle>}
          {header.description && (
            <CardDescription>{header.description}</CardDescription>
          )}
          {header.action && <CardAction>{header.action}</CardAction>}
        </CardHeader>
      )}

      <CardContent>{children}</CardContent>

      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
