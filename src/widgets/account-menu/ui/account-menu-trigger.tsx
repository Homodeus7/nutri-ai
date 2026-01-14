"use client";

import { DropdownMenuTrigger } from "@/shared/ui/primitives/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/ui/primitives/avatar";
import userFallback from "@/shared/assets/user.jpg";

interface AccountMenuTriggerProps {
  avatarUrl: string | null;
}

export function AccountMenuTrigger({ avatarUrl }: AccountMenuTriggerProps) {
  return (
    <DropdownMenuTrigger>
      <Avatar className="size-9">
        <AvatarImage src={avatarUrl ?? undefined} alt="User avatar" />
        <AvatarFallback>
          <img src={userFallback.src} alt="User avatar" />
        </AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
  );
}
