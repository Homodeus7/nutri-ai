import { usePostAuthGoogle } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useAuthStore } from "@/entities/auth";
import { useRouter } from "next/navigation";
import { CredentialResponse } from "@react-oauth/google";

export interface UseGoogleAuthOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
}

export function useGoogleAuth(options?: UseGoogleAuthOptions) {
  const { onSuccess, onError, redirectTo = "/" } = options || {};
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const mutation = usePostAuthGoogle({
    mutation: {
      onSuccess: (response) => {
        if (response?.token && response?.user) {
          setAuth(response.token, response.user);
        }

        onSuccess?.();
        router.push(redirectTo);
      },
      onError: (error) => {
        onError?.(error as Error);
      },
    },
  });

  const handleGoogleLogin = async (
    credentialResponse: CredentialResponse,
    timezone?: string
  ) => {
    if (!credentialResponse.credential) {
      onError?.(new Error("No credential received from Google"));
      return;
    }

    return mutation.mutate({
      data: {
        idToken: credentialResponse.credential,
        timezone,
      },
    });
  };

  return {
    handleGoogleLogin,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
