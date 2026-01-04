"use client";

import { useState } from "react";
import { User as UserIcon } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/primitives/card";
import { UiText } from "@/shared/ui/ui-text";
import { useAuthStore } from "@/entities/auth";

export function UserCard() {
  const { user } = useAuthStore();
  const [imageError, setImageError] = useState(false);

  if (!user) {
    return null;
  }

  const displayName = user.displayName || user.email.split("@")[0];
  const googlePictureUrl = getGooglePictureUrl();

  return (
    <Card className="min-h-full">
      <CardContent className="flex items-center gap-3 pt-6">
        <div className="w-10 h-10 border border-foreground rounded-full flex items-center justify-center overflow-hidden">
          {googlePictureUrl && !imageError ? (
            <img
              src={googlePictureUrl}
              alt={displayName}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <UiText variant="small">{displayName}</UiText>
          <UiText variant="muted" className="text-xs">
            {user.email}
          </UiText>
        </div>
      </CardContent>
    </Card>
  );
}

function getGooglePictureUrl(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const googleUser = localStorage.getItem("google-user");
    if (!googleUser) {
      return null;
    }

    const parsed = JSON.parse(googleUser);
    return parsed.picture || parsed.photoURL || null;
  } catch {
    return null;
  }
}
