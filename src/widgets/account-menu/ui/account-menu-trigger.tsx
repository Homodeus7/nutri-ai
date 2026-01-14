"use client";

import { forwardRef } from "react";
import { DropdownMenuTrigger } from "@/shared/ui/primitives/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/ui/primitives/avatar";
import { cn } from "@/shared/lib/css";
import userFallback from "@/shared/assets/user.jpg";

interface AccountMenuTriggerProps {
  avatarUrl: string | null;
  className?: string;
}

export const AccountMenuTrigger = forwardRef<
  HTMLButtonElement,
  AccountMenuTriggerProps
>(({ avatarUrl, className }, ref) => {
  return (
    <DropdownMenuTrigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        "hover:bg-accent focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-ring focus-visible:ring-offset-2",
        "transition-colors cursor-pointer",
        className
      )}
    >
      <Avatar className="w-9 h-9 border border-border">
        <AvatarImage src={avatarUrl ?? undefined} alt="User avatar" />
        <AvatarFallback>
          <img
            src={userFallback.src}
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
  );
});

AccountMenuTrigger.displayName = "AccountMenuTrigger";
