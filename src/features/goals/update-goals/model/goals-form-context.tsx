"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useGoalsForm, type GoalsFormReturn } from "./use-goals-form";

const GoalsFormContext = createContext<GoalsFormReturn | null>(null);

export function GoalsFormProvider({ children }: { children: ReactNode }) {
  const goalsForm = useGoalsForm();
  return (
    <GoalsFormContext.Provider value={goalsForm}>
      {children}
    </GoalsFormContext.Provider>
  );
}

export function useGoalsFormContext(): GoalsFormReturn {
  const ctx = useContext(GoalsFormContext);
  if (!ctx) {
    throw new Error("useGoalsFormContext must be used within GoalsFormProvider");
  }
  return ctx;
}
