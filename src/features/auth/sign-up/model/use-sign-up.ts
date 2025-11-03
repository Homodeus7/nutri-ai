import { usePostAuthSignup } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useAuthStore } from "@/entities/auth";
import { useRouter } from "next/navigation";
import { SignUpFormData } from "./sign-up.schema";

export interface UseSignUpOptions {
  /**
   * Callback on successful sign up
   */
  onSuccess?: () => void;

  /**
   * Callback on error
   */
  onError?: (error: Error) => void;

  /**
   * Redirect path after successful sign up
   */
  redirectTo?: string;
}

/**
 * Hook for sign-up functionality
 * Uses generated API hook from orval with TanStack Query
 * Automatically manages auth store and navigation
 *
 * @example
 * ```tsx
 * const { signUp, isPending } = useSignUp({
 *   redirectTo: "/dashboard"
 * });
 *
 * const handleSubmit = async (data: SignUpFormData) => {
 *   await signUp(data);
 * };
 * ```
 */
export function useSignUp(options?: UseSignUpOptions) {
  const { onSuccess, onError, redirectTo = "/" } = options || {};
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const mutation = usePostAuthSignup({
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
