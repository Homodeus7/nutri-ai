import {
  usePostAiParse,
  type AiParseRequestMealType,
} from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useState, useCallback } from "react";
import { AI_PARSE_ERROR_CODES, type AiParseErrorCode, type ApiErrorResponse } from "./types";

interface UseAiCreateMealParams {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function useAiCreateMeal({ onSuccess, onError }: UseAiCreateMealParams = {}) {
  const queryClient = useQueryClient();
  const [errorCode, setErrorCode] = useState<AiParseErrorCode | null>(null);

  const { mutate, isPending } = usePostAiParse({
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
          if (data?.code === AI_PARSE_ERROR_CODES.TOKEN_LIMIT_EXCEEDED) {
            setErrorCode(AI_PARSE_ERROR_CODES.TOKEN_LIMIT_EXCEEDED);
          }
        }
        onError?.(error);
      },
    },
  });

  const createMeal = useCallback(
    (text: string, mealType: AiParseRequestMealType, date: string) => {
      setErrorCode(null);
      mutate({ data: { text, mealType, date } });
    },
    [mutate],
  );

  const clearError = useCallback(() => setErrorCode(null), []);

  return { createMeal, isPending, errorCode, clearError };
}
