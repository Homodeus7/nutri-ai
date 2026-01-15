export interface MacroPreset {
  key: string;
  proteinPct: number;
  fatPct: number;
  carbsPct: number;
}

export const MACRO_PRESETS: MacroPreset[] = [
  { key: "balanced", proteinPct: 30, fatPct: 30, carbsPct: 40 },
  { key: "highProtein", proteinPct: 40, fatPct: 30, carbsPct: 30 },
  { key: "keto", proteinPct: 20, fatPct: 70, carbsPct: 10 },
  { key: "lowFat", proteinPct: 35, fatPct: 20, carbsPct: 45 },
] as const;

export const DEFAULT_PRESET = MACRO_PRESETS[0];

export const DEFAULT_DAILY_KCAL = 2500;

/**
 * Calculate grams from percentage and calories
 * Protein: 4 kcal/g
 * Carbs: 4 kcal/g
 * Fat: 9 kcal/g
 */
export function calculateGrams(
  dailyKcal: number,
  proteinPct: number,
  fatPct: number,
  carbsPct: number,
) {
  return {
    proteinGrams: Math.round((dailyKcal * proteinPct) / 100 / 4),
    fatGrams: Math.round((dailyKcal * fatPct) / 100 / 9),
    carbsGrams: Math.round((dailyKcal * carbsPct) / 100 / 4),
  };
}
