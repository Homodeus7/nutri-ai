import { useDeleteProductsId } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useQueryClient } from "@tanstack/react-query";

export interface UseDeleteProductOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useDeleteProduct(options?: UseDeleteProductOptions) {
  const { onSuccess, onError } = options || {};
  const queryClient = useQueryClient();

  const mutation = useDeleteProductsId({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0]?.toString().startsWith("/products") ?? false,
        });
        onSuccess?.();
      },
      onError: (error) => {
        onError?.(error as Error);
      },
    },
  });

  const deleteProduct = (id: string) => {
    return mutation.mutate({ id });
  };

  return {
    deleteProduct,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
