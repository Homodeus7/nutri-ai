import { usePostAuthSignup } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useAuthStore } from "@/entities/auth";
import { useRouter } from "next/navigation";

export interface SignUpFormData {
  email: string;
  password: string;
  displayName?: string;
  timezone?: string;
}

export interface UseSignUpOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
}

export function useSignUp(options?: UseSignUpOptions) {
  const { onSuccess, onError, redirectTo = "/" } = options || {};
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const mutation = usePostAuthSignup({
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

  const signUp = async (data: SignUpFormData) => {
    return mutation.mutate({
      data: {
        email: data.email,
        password: data.password,
        displayName: data.displayName,
        timezone: data.timezone,
      },
    });
  };

  return {
    signUp,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
