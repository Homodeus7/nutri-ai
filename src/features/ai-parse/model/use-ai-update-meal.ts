import { usePutAiMealsId } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useState, useCallback } from "react";
import { AI_PARSE_ERROR_CODES, type AiParseErrorCode, type ApiErrorResponse } from "./types";

interface UseAiUpdateMealParams {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function useAiUpdateMeal({ onSuccess, onError }: UseAiUpdateMealParams = {}) {
  const queryClient = useQueryClient();
  const [errorCode, setErrorCode] = useState<AiParseErrorCode | null>(null);

  const { mutate, isPending } = usePutAiMealsId({
    mutation: {
      onSuccess: () => {
        setErrorCode(null);
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0]?.toString().startsWith("/day/") ?? false,
        });
        onSuccess?.();
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          const data = error.response?.data as ApiErrorResponse | undefined;
          if (data?.code === AI_PARSE_ERROR_CODES.NO_ITEMS_FOUND) {
            setErrorCode(AI_PARSE_ERROR_CODES.NO_ITEMS_FOUND);
          }
        }
        onError?.(error);
      },
    },
  });

  const updateMeal = useCallback(
    (mealId: string, text: string) => {
      setErrorCode(null);
      mutate({ id: mealId, data: { text } });
    },
    [mutate],
  );

  const clearError = useCallback(() => setErrorCode(null), []);

  return { updateMeal, isPending, errorCode, clearError };
}
