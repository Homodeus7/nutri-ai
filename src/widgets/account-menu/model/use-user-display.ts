"use client";

import { useAuthStore } from "@/entities/auth";
import { getGoogleAvatarUrl } from "../lib/get-google-avatar";

export function useUserDisplay() {
  const { user } = useAuthStore();

  const avatarUrl = getGoogleAvatarUrl();
  const displayName = user?.displayName || user?.email?.split("@")[0] || "";
  const email = user?.email || "";

  return {
    user,
    avatarUrl,
    displayName,
    email,
  };
}
