import {
  usePostProducts,
  type CreateProductRequest,
  type Product,
} from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";

export interface UseCreateProductOptions {
  onSuccess?: (product: Product) => void;
  onError?: (error: Error) => void;
}

export function useCreateProduct(options?: UseCreateProductOptions) {
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

  const createProduct = async (data: CreateProductRequest) => {
    return mutation.mutate({
      data,
    });
  };

  return {
    createProduct,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
