import { create } from "zustand";

export interface ConsumedMacros {
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
  calories: number;
}

interface ConsumedMacrosStore {
  macros: ConsumedMacros;
  setMacros: (macros: ConsumedMacros) => void;
  reset: () => void;
}

const initialMacros: ConsumedMacros = {
  protein: 0,
  fat: 0,
  carbs: 0,
  fiber: 0,
  calories: 0,
};

export const useConsumedMacros = create<ConsumedMacrosStore>((set) => ({
  macros: initialMacros,

  setMacros: (macros) => set({ macros }),

  reset: () => set({ macros: initialMacros }),
}));
