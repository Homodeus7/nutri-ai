import {
  useGetUserPreferences,
  usePutUserPreferences,
} from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import type { UpdateUserPreferencesRequest } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useQueryClient } from "@tanstack/react-query";

export function usePreferences() {
  return useGetUserPreferences({
    query: {
      staleTime: Infinity,
    },
  });
}

export function useUpdatePreferences() {
  const queryClient = useQueryClient();

  const mutation = usePutUserPreferences({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/user/preferences"] });
      },
    },
  });

  const updatePreferences = (data: UpdateUserPreferencesRequest) => {
    mutation.mutate({ data });
  };

  return {
    updatePreferences,
    isPending: mutation.isPending,
  };
}
