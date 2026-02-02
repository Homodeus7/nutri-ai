"use client";

import * as React from "react";
import { cn } from "@/shared/lib/css";

const BORDER_OFFSET = 6;

function useAutosizeTextArea(
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>,
  triggerAutoSize: string,
  maxHeight: number,
  minHeight: number,
) {
  const [init, setInit] = React.useState(true);

  React.useEffect(() => {
    const el = textAreaRef.current;
    if (!el) return;

    if (init) {
      el.style.minHeight = `${minHeight + BORDER_OFFSET}px`;
      if (maxHeight > minHeight) {
        el.style.maxHeight = `${maxHeight}px`;
      }
      setInit(false);
    }

    el.style.height = `${minHeight + BORDER_OFFSET}px`;
    const scrollHeight = el.scrollHeight;

    if (scrollHeight > maxHeight) {
      el.style.height = `${maxHeight}px`;
    } else {
      el.style.height = `${scrollHeight + BORDER_OFFSET}px`;
    }
  }, [textAreaRef, triggerAutoSize, maxHeight, minHeight, init]);
}

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
  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [triggerAutoSize, setTriggerAutoSize] = React.useState("");

  useAutosizeTextArea(textAreaRef, triggerAutoSize, maxHeight, minHeight);

  React.useEffect(() => {
    setTriggerAutoSize(value as string);
  }, [props?.defaultValue, value]);

  return (
    <textarea
      {...props}
      value={value}
      ref={(node) => {
        textAreaRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.RefObject<HTMLTextAreaElement | null>).current = node;
      }}
      style={{
        minHeight: minHeight + BORDER_OFFSET,
        maxHeight: maxHeight < Number.MAX_SAFE_INTEGER ? maxHeight : undefined,
        overflowY: "auto",
      }}
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex w-full rounded-md border bg-transparent px-3 py-2 text-sm md:text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm [scrollbar-width:thin]",
        className,
      )}
      onChange={(e) => {
        setTriggerAutoSize(e.target.value);
        onChange?.(e);
      }}
    />
  );
}

export { AutosizeTextarea };
