"use client";

import * as React from "react";
import { cn } from "@/shared/lib/css";

const BORDER_OFFSET = 6;

type AutosizeTextareaProps = {
  maxHeight?: number;
  minHeight?: number;
  ref?: React.Ref<HTMLTextAreaElement>;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

function AutosizeTextarea({
  maxHeight = 150,
  minHeight = 36,
  className,
  onChange,
  value,
  ref,
  ...props
}: AutosizeTextareaProps) {
  const internalRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    const el = internalRef.current;
    if (!el) return;

    el.style.height = `${minHeight + BORDER_OFFSET}px`;
    el.style.height = `${Math.min(el.scrollHeight + BORDER_OFFSET, maxHeight)}px`;
  }, [value, minHeight, maxHeight]);

  return (
    <textarea
      {...props}
      value={value}
      ref={(node) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.RefObject<HTMLTextAreaElement | null>).current = node;
      }}
      style={{
        minHeight: minHeight + BORDER_OFFSET,
        maxHeight,
        overflowY: "auto",
      }}
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex w-full rounded-md border bg-transparent px-3 py-2 text-sm md:text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm [scrollbar-width:thin]",
        className,
      )}
      onChange={onChange}
    />
  );
}

export { AutosizeTextarea };
