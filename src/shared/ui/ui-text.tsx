import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/css";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

const textVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      "inline-code":
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

const variantElementMap = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  blockquote: "blockquote",
  list: "ul",
  "inline-code": "code",
  lead: "p",
  large: "div",
  small: "small",
  muted: "p",
} as const;

export type TextVariant = keyof typeof variantElementMap;

export interface UiTextProps<T extends ElementType = ElementType>
  extends VariantProps<typeof textVariants> {
  as?: T;
  className?: string;
  children: ReactNode;
}

export function UiText<T extends ElementType = "p">({
  variant = "p",
  align,
  weight,
  className,
  as,
  children,
  ...props
}: UiTextProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof UiTextProps<T>>) {
  const Component = (as ||
    variantElementMap[variant as TextVariant] ||
    "p") as ElementType;

  return (
    <Component
      className={cn(textVariants({ variant, align, weight }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
