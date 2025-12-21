import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shared/ui/primitives/card";
import { Separator } from "@/shared/ui/primitives/separator";
import React from "react";

export function AuthLayout({
  form,
  title,
  description,
  footerText,
  alternativeAuth,
  separatorText = "OR",
}: {
  form: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  footerText: React.ReactNode;
  alternativeAuth?: React.ReactNode;
  separatorText?: string;
}) {
  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {form}
        {alternativeAuth && (
          <>
            <div className="flex gap-4 items-center">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">
                {separatorText}
              </span>
              <Separator className="flex-1" />
            </div>
            {alternativeAuth}
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary">
          {footerText}
        </p>
      </CardFooter>
    </Card>
  );
}
