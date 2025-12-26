"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/primitives/button";
import {
  useSearchProducts,
  SearchInput,
  ProductsTable,
  useI18n,
} from "@/features/product/search-product";
import { CreateProductForm, type ProductItemData } from "@/features/product/create-product";
import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { SearchTabLayout } from "./search-tab-layout";

interface SearchProductsTabProps {
  onSelectProducts: (products: Product[]) => void;
  onCreateProduct: (productItemData: ProductItemData) => void;
  onShowCreateFormChange?: (show: boolean) => void;
}

export function SearchProductsTab({
  onSelectProducts,
  onCreateProduct,
  onShowCreateFormChange,
}: SearchProductsTabProps) {
  const { t } = useI18n();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { setSearchQuery, products, isLoading, isEmpty } = useSearchProducts({
    limit: 100,
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreateSuccess = (productItemData: ProductItemData) => {
    setShowCreateForm(false);
    onShowCreateFormChange?.(false);
    onCreateProduct(productItemData);
  };

  const handleShowCreateFormChange = (show: boolean) => {
    setShowCreateForm(show);
    onShowCreateFormChange?.(show);
  };

  return (
    <SearchTabLayout
      showCreateForm={showCreateForm}
      onBackToSearch={() => handleShowCreateFormChange(false)}
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
        />
      }
      emptyState={
        <div className="space-y-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">{t("noResults")}</p>
          <Button onClick={() => handleShowCreateFormChange(true)}>
            {t("createProduct")}
          </Button>
        </div>
      }
      createForm={<CreateProductForm onSuccess={handleCreateSuccess} />}
    />
  );
}
