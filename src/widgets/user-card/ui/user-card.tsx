"use client";

import { useState } from "react";
import { User as UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/shared/ui/primitives/card";
import { UiText } from "@/shared/ui/ui-text";
import { useAuthStore } from "@/entities/auth";
import { useI18n } from "../i18n";

export function UserCard() {
  const { t } = useI18n();
  const { user } = useAuthStore();
  const [imageError, setImageError] = useState(false);

  if (!user) {
    return null;
  }

  const displayName = user.displayName || user.email.split("@")[0];
  const googlePictureUrl = getGooglePictureUrl();

  return (
    <Card className="min-h-full">
      <CardHeader>
        <UiText variant="large">{t("goodMorning")}</UiText>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        <div className="w-10 h-10 border border-foreground rounded-full flex items-center justify-center">
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
          <UiText variant="small" className="mt-1">
            {user.displayName}
          </UiText>
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
