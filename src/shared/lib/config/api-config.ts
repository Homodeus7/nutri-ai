/**
 * API configuration
 * Set USE_MOCK_API to false in production
 */
export const API_CONFIG = {
  /**
   * Use mock API handlers (MSW) instead of real API
   * Set to false in production
   */
  USE_MOCK_API: process.env.NEXT_PUBLIC_USE_MOCK_API === "true",

  /**
   * API base URL
   */
  API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
} as const;
