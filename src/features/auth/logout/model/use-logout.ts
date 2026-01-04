import { useAuthStore } from "@/entities/auth";
import { useRouter } from "next/navigation";
import { ROUTER_PATHS } from "@/shared/constants/routes";

export interface UseLogoutOptions {
  onSuccess?: () => void;
  redirectTo?: string;
}

export function useLogout(options?: UseLogoutOptions) {
  const { onSuccess, redirectTo = ROUTER_PATHS.SIGN_IN } = options || {};
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
