/**
 * Hook to get user's timezone
 * @returns User's timezone string (e.g., "Europe/Moscow")
 */
export function useTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
