import { useAuthStore } from "@/entities/auth";
import { ROUTER_PATHS } from "@/shared/constants/routes";
import { ComposeChildren, useEventCallback } from "@/shared/lib/react";
import { UiPageSpinner } from "@/shared/ui";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGetAuthMe } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";

export const loadPrivateLoaderData = async () => {
  return {};
};

export function PrivateLoader({
  children,
}: {
  children?: React.ReactNode;
  data?: Awaited<ReturnType<typeof loadPrivateLoaderData>>;
}) {
  const router = useRouter();
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  const token = useAuthStore((s) => s.token);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const setUser = useAuthStore((s) => s.setUser);

  const routerReplace = useEventCallback(router.replace);

  // Validate token with API (only after hydration)
  const { data: userData, error, isLoading } = useGetAuthMe({
    query: {
      enabled: hasHydrated && !!token,
      retry: false,
      staleTime: Infinity,
    },
  });

  useEffect(() => {
    // Wait for hydration
    if (!hasHydrated) return;

    // No token - redirect to login
    if (!token) {
      routerReplace(ROUTER_PATHS.SIGN_IN);
      return;
    }

    // Still validating
    if (isLoading) return;

    // Validation failed - clear auth and redirect
    if (error) {
      clearAuth();
      routerReplace(ROUTER_PATHS.SIGN_IN);
      return;
    }

    // Token valid - update user
    if (userData) {
      setUser(userData);
    }
  }, [hasHydrated, token, isLoading, error, userData, clearAuth, setUser, routerReplace]);

  // Show loader until token is validated
  if (!hasHydrated || isLoading || (!userData && !error)) {
    return <UiPageSpinner isLoading={true} />;
  }

  return <ComposeChildren>{children}</ComposeChildren>;
}
