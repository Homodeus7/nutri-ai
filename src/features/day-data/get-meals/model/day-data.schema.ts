import { z } from "zod";

export const dayDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in format YYYY-MM-DD");

export const parseDayDate = (date: string): string => {
  return dayDateSchema.parse(date);
};



export type DayDate = z.infer<typeof dayDateSchema>;
