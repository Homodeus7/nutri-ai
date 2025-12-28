import { z } from "zod";

export const dayDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in format YYYY-MM-DD");

export const parseDayDate = (date: string): string => {
  return dayDateSchema.parse(date);
};

export const formatDayDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getTodayDate = (): string => {
  return formatDayDate(new Date());
};

export type DayDate = z.infer<typeof dayDateSchema>;
