"use client";

import { UiText } from "@/shared/ui/ui-text";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/ui/primitives/avatar";
import userFallback from "@/shared/assets/user.jpg";

interface AccountMenuHeaderProps {
  avatarUrl: string | null;
  displayName: string;
  email: string;
}

export function AccountMenuHeader({
  avatarUrl,
  displayName,
  email,
}: AccountMenuHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-2 py-3">
      <Avatar className="w-10 h-10 border border-border">
        <AvatarImage src={avatarUrl ?? undefined} alt={displayName} />
        <AvatarFallback>
          <img
            src={userFallback.src}
            alt={displayName}
            className="w-full h-full object-cover"
          />
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <UiText variant="small" className="font-medium truncate">
          {displayName}
        </UiText>
        <UiText variant="muted" className="text-xs truncate">
          {email}
        </UiText>
      </div>
    </div>
  );
}
