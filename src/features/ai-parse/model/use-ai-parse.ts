import type { AiParseRequestMealType } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useDayData } from "@/features/day-data";
import { useMemo, useCallback } from "react";
import { useAiCreateMeal } from "./use-ai-create-meal";
import { useAiUpdateMeal } from "./use-ai-update-meal";

interface UseAiParseParams {
  date: string;
  mealType: AiParseRequestMealType;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function useAiParse({ date, mealType, onSuccess, onError }: UseAiParseParams) {
  const { data: dayData } = useDayData({ date });

  const existingMeal = useMemo(
    () => dayData?.meals?.find((meal) => meal.type === mealType),
    [dayData?.meals, mealType],
  );

  const {
    createMeal,
    isPending: isCreating,
    errorCode: createErrorCode,
    clearError: clearCreateError,
  } = useAiCreateMeal({ onSuccess, onError });

  const {
    updateMeal,
    isPending: isUpdating,
    errorCode: updateErrorCode,
    clearError: clearUpdateError,
  } = useAiUpdateMeal({ onSuccess, onError });

  const parseText = useCallback(
    (text: string) => {
      if (existingMeal) {
        updateMeal(existingMeal.id, text);
      } else {
        createMeal(text, mealType, date);
      }
    },
    [existingMeal, updateMeal, createMeal, mealType, date],
  );

  const clearError = useCallback(() => {
    clearCreateError();
    clearUpdateError();
  }, [clearCreateError, clearUpdateError]);

  return {
    parseText,
    isPending: isCreating || isUpdating,
    errorCode: createErrorCode ?? updateErrorCode,
    clearError,
    existingMeal,
  };
}
