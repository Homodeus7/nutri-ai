import { useAuthStore } from "@/entities/auth";
import { useRouter } from "next/navigation";

export interface UseLogoutOptions {
  onSuccess?: () => void;
  redirectTo?: string;
}

export function useLogout(options?: UseLogoutOptions) {
  const { onSuccess, redirectTo = "/sign-in" } = options || {};
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const logout = () => {
    clearAuth();
    onSuccess?.();
    router.push(redirectTo);
  };

  return {
    logout,
  };
}
