import { usePostAuthLogin } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useAuthStore } from "@/entities/auth";
import { useRouter } from "next/navigation";
import { SignInFormData } from "./sign-in.schema";

export interface UseSignInOptions {
  /**
   * Callback on successful sign in
   */
  onSuccess?: () => void;

  /**
   * Callback on error
   */
  onError?: (error: Error) => void;

  /**
   * Redirect path after successful sign in
   */
  redirectTo?: string;
}

/**
 * Hook for sign-in functionality
 * Uses generated API hook from orval with TanStack Query
 * Automatically manages auth store and navigation
 *
 * @example
 * ```tsx
 * const { signIn, isPending } = useSignIn({
 *   redirectTo: "/dashboard"
 * });
 *
 * const handleSubmit = async (data: SignInFormData) => {
 *   await signIn(data);
 * };
 * ```
 */
export function useSignIn(options?: UseSignInOptions) {
  const { onSuccess, onError, redirectTo = "/" } = options || {};
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const mutation = usePostAuthLogin({
    mutation: {
      onSuccess: (response) => {
        // Store auth data
        if (response?.token && response?.user) {
          setAuth(response.token, response.user);
        }

        // Call custom onSuccess callback
        onSuccess?.();

        // Redirect to specified path
        router.push(redirectTo);
      },
      onError: (error) => {
        // Call custom onError callback
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
