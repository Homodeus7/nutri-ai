const themeMap: Record<string, string> = {
  orange: "#f97316",
  blue: "#3b82f6",
  green: "#22c55e",
  red: "#ef4444",
  purple: "#a855f7",
  pink: "#ec4899",
  yellow: "#eab308",
};

export const colors = {
  background: "#0a0a0a",
  foreground: "#fafafa",
  muted: "#27272a",
  mutedForeground: "#a1a1aa",
  destructive: "#ef4444",
  cardBackground: "#18181b",
  border: "#27272a",
  protein: "#3b82f6",
  fat: "#f59e0b",
  carbs: "#22c55e",
  fiber: "#a855f7",
} as const;

export function getThemeColors(theme: string) {
  const primary = themeMap[theme] ?? themeMap.orange;

  return {
    ...colors,
    primary,
  };
}
