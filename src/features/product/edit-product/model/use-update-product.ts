import {
  usePutProductsId,
  type UpdateProductRequest,
  type Product,
} from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useQueryClient } from "@tanstack/react-query";

export interface UseUpdateProductOptions {
  onSuccess?: (product: Product) => void;
  onError?: (error: Error) => void;
}

export function useUpdateProduct(options?: UseUpdateProductOptions) {
  const { onSuccess, onError } = options || {};
  const queryClient = useQueryClient();

  const mutation = usePutProductsId({
    mutation: {
      onSuccess: (product) => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0]?.toString().startsWith("/products") ?? false,
        });
        onSuccess?.(product);
      },
      onError: (error) => {
        onError?.(error as Error);
      },
    },
  });

  const updateProduct = (id: string, data: UpdateProductRequest) => {
    return mutation.mutate({
      id,
      data,
    });
  };

  return {
    updateProduct,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
