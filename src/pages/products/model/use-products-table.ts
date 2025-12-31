import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import type { PaginationState } from "@tanstack/react-table";
import {
  useGetProducts,
  type Product,
  type GetProductsSource,
} from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useDebounce } from "@/shared/lib/react";
import type { TablePaginationState } from "@/shared/ui/data-table";

export interface ProductsFilters {
  search: string;
  category: string;
  source: GetProductsSource | "";
}

export function useProductsTable() {
  const router = useRouter();

  const [pagination, setPagination] = useState<TablePaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const [filters, setFilters] = useState<ProductsFilters>({
    search: "",
    category: "",
    source: "",
  });

  const debouncedSearch = useDebounce(filters.search, 300);

  const queryParams = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      category: filters.category || undefined,
      source: (filters.source || undefined) as GetProductsSource | undefined,
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
    }),
    [debouncedSearch, filters.category, filters.source, pagination]
  );

  const { data, isLoading, error } = useGetProducts(queryParams);

  const pageCount = useMemo(() => {
    if (!data?.total) return 0;
    return Math.ceil(data.total / pagination.pageSize);
  }, [data?.total, pagination.pageSize]);

  const handleRowClick = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  const handlePaginationChange = (
    updaterOrValue: PaginationState | ((old: PaginationState) => PaginationState)
  ) => {
    const newState =
      typeof updaterOrValue === "function"
        ? updaterOrValue({
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
          })
        : updaterOrValue;
    setPagination(newState);
  };

  const updateFilters = (newFilters: Partial<ProductsFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  return {
    products: data?.products ?? [],
    total: data?.total ?? 0,

    pagination,
    handlePaginationChange,
    pageCount,

    filters,
    updateFilters,

    isLoading,
    error,

    handleRowClick,
  };
}
