export { UpdateGoalsForm, GOALS_FORM_ID } from "./ui/update-goals-form";
export {
  GoalsFormProvider,
  useGoalsFormContext,
} from "./model/goals-form-context";
export { useGoalsForm } from "./model/use-goals-form";
export type { GoalsFormReturn } from "./model/use-goals-form";
export { useUpdateGoals, useGoals } from "./model/use-update-goals";
export {
  MACRO_PRESETS,
  DEFAULT_PRESET,
  DEFAULT_DAILY_KCAL,
  calculateGrams,
} from "./model/presets";
export type { MacroPreset } from "./model/presets";
