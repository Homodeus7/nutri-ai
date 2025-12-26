import { useState, useMemo } from "react";
import { useGetProductsSearch } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useDebounce } from "@/shared/lib/react";
import { transliterate, hasCyrillic } from "@/shared/lib/transliterate";

export interface UseSearchProductsOptions {
  limit?: number;
  debounceDelay?: number;
}

export function useSearchProducts(options?: UseSearchProductsOptions) {
  const { limit = 10, debounceDelay = 300 } = options || {};
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedQuery = useDebounce(searchQuery, debounceDelay);

  const processedQuery = useMemo(() => {
    return hasCyrillic(debouncedQuery)
      ? transliterate(debouncedQuery)
      : debouncedQuery;
  }, [debouncedQuery]);

  const { data, isLoading, error } = useGetProductsSearch(
    { q: processedQuery, limit },
    { query: { enabled: processedQuery.length > 0 } },
  );

  return {
    searchQuery,
    setSearchQuery,
    products: data?.products || [],
    isLoading,
    error,
    isEmpty: !isLoading && searchQuery.length > 0 && data?.products?.length === 0,
  };
}
