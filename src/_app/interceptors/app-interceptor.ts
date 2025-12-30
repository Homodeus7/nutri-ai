import { apiInstance } from "@/shared/api/api-instance";
import { useAuthStore } from "@/entities/auth";
import { ROUTER_PATHS } from "@/shared/constants/routes";
import { useEventCallback } from "@/shared/lib/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useApplayAppInterceptor() {
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const routerReplace = useEventCallback(router.replace);

  useEffect(() => {
    // Request interceptor - add auth token
    const requestInterceptor = apiInstance.interceptors.request.use(
      (config) => {
        // Read token directly from store to get the latest value
        const token = useAuthStore.getState().token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Response interceptor - handle errors
    const responseInterceptor = apiInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Skip auth handling for /auth/me endpoint - it's handled in PrivateLoader
        const isAuthMeEndpoint = error.config?.url?.includes("/auth/me");

        if (error.response?.status === 401 && !isAuthMeEndpoint) {
          clearAuth();
          routerReplace(ROUTER_PATHS.SIGN_IN);
        }

        if (error.response?.status === 403) {
          routerReplace(ROUTER_PATHS[403]);
        }

        return Promise.reject(error);
      },
    );

    // Cleanup interceptors on unmount
    return () => {
      apiInstance.interceptors.request.eject(requestInterceptor);
      apiInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [clearAuth, routerReplace]);
}
