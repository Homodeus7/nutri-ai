"use client";

import { Button } from "@/shared/ui/primitives/button";
import { ChevronRight } from "lucide-react";
import {
  useSearchProducts,
  SearchInput,
  ProductsTable,
} from "@/features/product/search-product";
import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { SearchTabLayout } from "./search-tab-layout";
import { useI18n } from "../i18n";

interface SearchProductsTabProps {
  onSelectProducts: (products: Product[]) => void;
  onShowCreateForm: () => void;
}

export function SearchProductsTab({
  onSelectProducts,
  onShowCreateForm,
}: SearchProductsTabProps) {
  const { t } = useI18n();

  const { setSearchQuery, products, isLoading, isEmpty } = useSearchProducts({
    limit: 100,
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <SearchTabLayout
      isLoading={isLoading}
      isEmpty={isEmpty}
      hasContent={products.length > 0}
      searchInput={<SearchInput onSearchChange={handleSearchChange} />}
      loadingState={
        <div className="text-center text-sm text-muted-foreground py-8">
          {t("searching")}
        </div>
      }
      content={
        <ProductsTable
          products={products}
          onSelectProducts={onSelectProducts}
          onCreateProduct={onShowCreateForm}
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
