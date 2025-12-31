import {
  usePostAiParse,
  type AiParseRequestMealType,
} from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useQueryClient } from "@tanstack/react-query";

interface UseAiParseParams {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function useAiParse({ onSuccess, onError }: UseAiParseParams = {}) {
  const queryClient = useQueryClient();

  const { mutate, isPending, data } = usePostAiParse({
    mutation: {
      onSuccess: () => {
        // Invalidate day queries to refetch fresh data with new meal
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0]?.toString().startsWith("/day/") ?? false,
        });
        onSuccess?.();
      },
      onError: (error) => {
        console.error("Failed to parse text with AI:", error);
        onError?.(error);
      },
    },
  });

  const parseText = (
    text: string,
    mealType: AiParseRequestMealType,
    date: string,
  ) => {
    mutate({
      data: {
        text,
        mealType,
        date,
      },
    });
  };

  return {
    parseText,
    isPending,
    data,
  };
}
