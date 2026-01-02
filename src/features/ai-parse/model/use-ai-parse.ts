import {
  usePostAiParse,
  type AiParseRequestMealType,
} from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useState } from "react";

// API error codes
export const AI_PARSE_ERROR_CODES = {
  NO_ITEMS_FOUND: 2,
} as const;

export type AiParseErrorCode =
  (typeof AI_PARSE_ERROR_CODES)[keyof typeof AI_PARSE_ERROR_CODES];

interface ApiErrorResponse {
  code?: number;
  message?: string;
  timestamp?: string;
  path?: string;
  extensions?: unknown[];
}

interface UseAiParseParams {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function useAiParse({ onSuccess, onError }: UseAiParseParams = {}) {
  const queryClient = useQueryClient();
  const [errorCode, setErrorCode] = useState<AiParseErrorCode | null>(null);

  const { mutate, isPending, data } = usePostAiParse({
    mutation: {
      onSuccess: () => {
        setErrorCode(null);
        // Invalidate day queries to refetch fresh data with new meal
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0]?.toString().startsWith("/day/") ?? false,
        });
        onSuccess?.();
      },
      onError: (error) => {
        console.error("Failed to parse text with AI:", error);

        // Extract error code from API response
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

  const parseText = (
    text: string,
    mealType: AiParseRequestMealType,
    date: string,
  ) => {
    setErrorCode(null);
    mutate({
      data: {
        text,
        mealType,
        date,
      },
    });
  };

  const clearError = () => {
    setErrorCode(null);
  };

  return {
    parseText,
    isPending,
    data,
    errorCode,
    clearError,
  };
}
