type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
type MonthKey =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

type TranslateFn = (key: DayKey | MonthKey) => string;

interface DayData {
  day: string;
  date: Date;
}

const MONTH_KEYS: MonthKey[] = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const DAY_KEYS: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export const getWeekStart = (date: Date): Date => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
};

export const generateWeekDays = (date: Date, t: TranslateFn): DayData[] => {
  const weekStart = getWeekStart(date);
  const days: DayData[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(weekStart);
    currentDay.setDate(weekStart.getDate() + i);
    days.push({
      day: t(DAY_KEYS[i]),
      date: currentDay,
    });
  }

  return days;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const formatMonthYear = (date: Date, t: TranslateFn): string => {
  const monthKey = MONTH_KEYS[date.getMonth()];
  return `${t(monthKey)} ${date.getFullYear()}`;
};

export const addWeeks = (date: Date, weeks: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + weeks * 7);
  return newDate;
};
