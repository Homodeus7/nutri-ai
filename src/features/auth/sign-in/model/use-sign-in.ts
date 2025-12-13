import { usePostAuthLogin } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useAuthStore } from "@/entities/auth";
import { useRouter } from "next/navigation";

export interface SignInFormData {
  email: string;
  password: string;
}

export interface UseSignInOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
}

export function useSignIn(options?: UseSignInOptions) {
  const { onSuccess, onError, redirectTo = "/" } = options || {};
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const mutation = usePostAuthLogin({
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

  const signIn = async (data: SignInFormData) => {
    return mutation.mutate({
      data: {
        email: data.email,
        password: data.password,
      },
    });
  };

  return {
    signIn,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
