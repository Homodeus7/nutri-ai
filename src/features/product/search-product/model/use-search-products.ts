import { useState, useMemo } from "react";
import { useGetProductsSearch } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useDebounce } from "@/shared/lib/react";
import { transliterate, hasCyrillic } from "@/shared/lib/transliterate";

export interface UseSearchProductsOptions {
  limit?: number;
  debounceDelay?: number;
  initialQuery?: string;
  onQueryChange?: (query: string) => void;
}

export function useSearchProducts(options?: UseSearchProductsOptions) {
  const { limit = 10, debounceDelay = 300, initialQuery = "", onQueryChange } = options || {};
  const [searchQuery, setSearchQuery] = useState(initialQuery);

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

  const handleSetSearchQuery = (query: string) => {
    setSearchQuery(query);
    onQueryChange?.(query);
  };

  return {
    searchQuery,
    setSearchQuery: handleSetSearchQuery,
    products: data?.products || [],
    isLoading,
    error,
    isEmpty: !isLoading && searchQuery.length > 0 && data?.products?.length === 0,
  };
}
