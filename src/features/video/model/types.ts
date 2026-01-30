import { z } from "zod";

export const mealSummarySchema = z.object({
  type: z.string(),
  name: z.string(),
  totalKcal: z.number(),
});

export const dailySummarySchema = z.object({
  calories: z.number(),
  caloriesGoal: z.number(),
  protein: z.number(),
  fat: z.number(),
  carbs: z.number(),
  fiber: z.number(),
  proteinGoal: z.number(),
  fatGoal: z.number(),
  carbsGoal: z.number(),
  fiberGoal: z.number(),
  themeColor: z.string(),
  date: z.string(),
  meals: z.array(mealSummarySchema),
});

export type DailySummaryProps = z.infer<typeof dailySummarySchema>;
export type MealSummary = z.infer<typeof mealSummarySchema>;
