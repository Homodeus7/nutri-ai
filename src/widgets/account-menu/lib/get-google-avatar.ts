const GOOGLE_USER_KEY = "google-user";

export function getGoogleAvatarUrl(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const googleUser = localStorage.getItem(GOOGLE_USER_KEY);
    if (!googleUser) {
      return null;
    }

    const parsed = JSON.parse(googleUser);
    return parsed.picture || parsed.photoURL || null;
  } catch {
    return null;
  }
}
