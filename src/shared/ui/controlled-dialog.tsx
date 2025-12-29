"use client";

import { useState, useCallback, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/primitives/dialog";

export interface UseControlledDialogOptions {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface UseControlledDialogReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setOpen: (open: boolean) => void;
}

export function useControlledDialog({
  defaultOpen = false,
  onOpenChange,
}: UseControlledDialogOptions = {}): UseControlledDialogReturn {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const setOpen = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      onOpenChange?.(open);
    },
    [onOpenChange]
  );

  const open = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const toggle = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  return {
    isOpen,
    open,
    close,
    toggle,
    setOpen,
  };
}

export interface ControlledDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  trigger?: ReactNode;
  children: ReactNode;
  contentClassName?: string;
}

export function ControlledDialog({
  isOpen,
  onOpenChange,
  title,
  trigger,
  children,
  contentClassName,
}: ControlledDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={contentClassName}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
