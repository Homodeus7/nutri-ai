"use client";

import { Button } from "@/shared/ui/primitives/button";
import { ChevronRight } from "lucide-react";
import {
  useSearchProducts,
  SearchInput,
  ProductsTable,
} from "@/features/product/search-product";
import { SearchTabLayout } from "./search-tab-layout";
import { useI18n } from "../i18n";

interface SearchProductsTabProps {
  onAddProducts: () => void;
  onShowCreateForm: () => void;
  isPending: boolean;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

export function SearchProductsTab({
  onAddProducts,
  onShowCreateForm,
  isPending,
  searchQuery,
  onSearchQueryChange,
}: SearchProductsTabProps) {
  const { t } = useI18n();

  const { setSearchQuery, products, isLoading, isEmpty } = useSearchProducts({
    limit: 100,
    initialQuery: searchQuery,
    onQueryChange: onSearchQueryChange,
  });

  return (
    <SearchTabLayout
      isLoading={isLoading}
      isEmpty={isEmpty}
      hasContent={products.length > 0}
      searchInput={<SearchInput onSearchChange={setSearchQuery} initialValue={searchQuery} />}
      loadingState={
        <div className="text-center text-sm text-muted-foreground py-8">
          {t("searching")}
        </div>
      }
      content={
        <ProductsTable
          products={products}
          onAddProducts={onAddProducts}
          onCreateProduct={onShowCreateForm}
          isPending={isPending}
        />
      }
      emptyState={
        <div className="space-y-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">{t("noResults")}</p>
          <Button variant="ghost" onClick={onShowCreateForm}>
            {t("createProduct")}
            <ChevronRight size="20" />
          </Button>
        </div>
      }
    />
  );
}
