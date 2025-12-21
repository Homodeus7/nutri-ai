import {
  usePostProducts,
  type CreateProductRequest,
  type Product,
} from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";

export interface UseCreateFoodOptions {
  onSuccess?: (product: Product) => void;
  onError?: (error: Error) => void;
}

export function useCreateFood(options?: UseCreateFoodOptions) {
  const { onSuccess, onError } = options || {};

  const mutation = usePostProducts({
    mutation: {
      onSuccess: (product) => {
        onSuccess?.(product);
      },
      onError: (error) => {
        onError?.(error as Error);
      },
    },
  });

  const createFood = async (data: CreateProductRequest) => {
    return mutation.mutate({
      data,
    });
  };

  return {
    createFood,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
