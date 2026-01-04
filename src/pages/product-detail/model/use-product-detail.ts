import { useRouter } from "next/router";
import { useGetProductsId } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { ROUTER_PATHS } from "@/shared/constants/routes";

export function useProductDetail() {
  const router = useRouter();
  const productId = router.query.id as string | undefined;

  const { data: product, isLoading, error } = useGetProductsId(
    productId ?? "",
    { query: { enabled: !!productId } }
  );

  const goBack = () => {
    router.push(ROUTER_PATHS.PRODUCTS);
  };

  return {
    product,
    isLoading,
    error,
    goBack,
  };
}
