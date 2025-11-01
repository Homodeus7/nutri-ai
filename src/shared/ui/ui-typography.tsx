import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

const typographyVariants = cva("", {
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

// Mapping variants to default HTML elements
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

export type TypographyVariant = keyof typeof variantElementMap;

export interface UiTypographyProps<T extends ElementType = ElementType>
  extends VariantProps<typeof typographyVariants> {
  /**
   * The HTML element or React component to render
   * If not provided, will default to the semantic element for the variant
   */
  as?: T;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * The content to render
   */
  children: ReactNode;
}

/**
 * Universal typography component inspired by shadcn/ui
 *
 * @example
 * ```tsx
 * // Heading
 * <UiTypography variant="h1">Page Title</UiTypography>
 *
 * // Paragraph with custom alignment
 * <UiTypography variant="p" align="center">Centered text</UiTypography>
 *
 * // Muted text
 * <UiTypography variant="muted">Secondary information</UiTypography>
 *
 * // Custom element with variant styles
 * <UiTypography variant="h2" as="div">Styled as h2, rendered as div</UiTypography>
 *
 * // Override font weight
 * <UiTypography variant="p" weight="bold">Bold paragraph</UiTypography>
 * ```
 */
export function UiTypography<T extends ElementType = "p">({
  variant = "p",
  align,
  weight,
  className,
  as,
  children,
  ...props
}: UiTypographyProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof UiTypographyProps<T>>) {
  // Use provided 'as' prop or default to semantic element for variant
  const Component = (as ||
    variantElementMap[variant as TypographyVariant] ||
    "p") as ElementType;

  return (
    <Component
      className={cn(typographyVariants({ variant, align, weight }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
