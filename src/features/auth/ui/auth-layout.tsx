import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shared/ui/primitives/card";
import { FieldSeparator } from "@/shared/ui/primitives/field";
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
    <Card className="w-full max-w-[440px]">
      <CardHeader className="text-center">
        <CardTitle className=" md:text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        {form}
        {alternativeAuth && (
          <>
            <div>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                {separatorText}
              </FieldSeparator>
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
