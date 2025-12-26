"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/primitives/button";
import {
  useSearchProducts,
  SearchInput,
  ProductsTable,
} from "@/features/food/search-product";
import { CreateFoodForm, type FoodItemData } from "@/features/food/create-food";
import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { SearchTabLayout } from "./search-tab-layout";

interface SearchProductsTabProps {
  onSelectProducts: (products: Product[]) => void;
  onCreateProduct: (foodItemData: FoodItemData) => void;
  onShowCreateFormChange?: (show: boolean) => void;
}

export function SearchProductsTab({
  onSelectProducts,
  onCreateProduct,
  onShowCreateFormChange,
}: SearchProductsTabProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { setSearchQuery, products, isLoading, isEmpty } = useSearchProducts({
    limit: 100,
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreateSuccess = (foodItemData: FoodItemData) => {
    setShowCreateForm(false);
    onShowCreateFormChange?.(false);
    onCreateProduct(foodItemData);
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
          Поиск...
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
          <p className="text-sm text-muted-foreground">Ничего не найдено</p>
          <Button onClick={() => handleShowCreateFormChange(true)}>
            Создать продукт
          </Button>
        </div>
      }
      createForm={<CreateFoodForm onSuccess={handleCreateSuccess} />}
    />
  );
}
