import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";

interface AuthState {
  /**
   * JWT authentication token
   */
  token: string | null;

  /**
   * Current authenticated user
   */
  user: User | null;

  /**
   * Check if user is authenticated
   */
  isAuthenticated: boolean;

  /**
   * Set authentication data (token and user)
   */
  setAuth: (token: string, user: User) => void;

  /**
   * Clear authentication data (logout)
   */
  clearAuth: () => void;

  /**
   * Update user data
   */
  setUser: (user: User) => void;
}

/**
 * Auth store with JWT token and user data management
 * Uses localStorage for persistence
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token, user) =>
        set({
          token,
          user,
          isAuthenticated: true,
        }),

      clearAuth: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),

      setUser: (user) =>
        set({
          user,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist token and user, not isAuthenticated flag
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
      // Rehydrate isAuthenticated based on token presence
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isAuthenticated = !!state.token;
        }
      },
    },
  ),
);
