import { apiInstance } from "@/shared/api/api-instance";
import { useAuthStore } from "@/entities/auth";
import { ROUTER_PATHS } from "@/shared/constants/routes";
import { useEventCallback } from "@/shared/lib/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useApplayAppInterceptor() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const routerReplace = useEventCallback(router.replace);

  useEffect(() => {
    // Request interceptor - add auth token
    const requestInterceptor = apiInstance.interceptors.request.use(
      (config) => {
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
        if (error.response?.status === 401) {
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
  }, [token, clearAuth, routerReplace]);
}
