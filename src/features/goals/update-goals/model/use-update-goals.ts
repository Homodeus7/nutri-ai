import {
  usePutUserGoals,
  useGetUserGoals,
} from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useQueryClient } from "@tanstack/react-query";

export interface UpdateGoalsData {
  dailyKcalGoal: number;
  proteinPct: number;
  fatPct: number;
  carbsPct: number;
}

export interface UseUpdateGoalsOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useUpdateGoals(options?: UseUpdateGoalsOptions) {
  const { onSuccess, onError } = options || {};
  const queryClient = useQueryClient();

  const mutation = usePutUserGoals({
    mutation: {
      onSuccess: () => {
        // Invalidate goals query to refetch
        queryClient.invalidateQueries({ queryKey: ["/user/goals"] });
        // Also invalidate user query since goals are part of user
        queryClient.invalidateQueries({ queryKey: ["/auth/me"] });
        onSuccess?.();
      },
      onError: (error) => {
        onError?.(error as Error);
      },
    },
  });

  const updateGoals = (data: UpdateGoalsData) => {
    return mutation.mutate({
      data: {
        dailyKcalGoal: data.dailyKcalGoal,
        proteinPct: data.proteinPct,
        fatPct: data.fatPct,
        carbsPct: data.carbsPct,
      },
    });
  };

  return {
    updateGoals,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}

export function useGoals() {
  return useGetUserGoals();
}
