import { useRouter } from "next/router";
import { useGetProductsId } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";

export function useProductDetail() {
  const router = useRouter();
  const productId = router.query.id as string | undefined;

  const { data: product, isLoading, error } = useGetProductsId(
    productId ?? "",
    { query: { enabled: !!productId } }
  );

  const goBack = () => {
    router.push("/products");
  };

  return {
    product,
    isLoading,
    error,
    goBack,
  };
}
