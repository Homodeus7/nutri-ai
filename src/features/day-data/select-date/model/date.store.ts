import { create } from "zustand";
import { formatDayDate, getTodayDate } from "../../get-meals/model/day-data.schema";

type DateStore = {
  selectedDate: Date;
  selectedDateString: string;
  setDate: (date: Date) => void;
};

export const useSelectedDate = create<DateStore>((set) => ({
  selectedDate: new Date(),
  selectedDateString: getTodayDate(),
  setDate: (date: Date) => {
    set({
      selectedDate: date,
      selectedDateString: formatDayDate(date),
    });
  },
}));
