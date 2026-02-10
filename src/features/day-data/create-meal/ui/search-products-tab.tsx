"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/primitives/button";
import { ChevronRight, Clock, Search } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui/primitives/tabs";
import {
  useSearchProducts,
  ProductsTable,
} from "@/features/product/search-product";
import { SearchInput } from "@/shared/ui";
import { SearchTabLayout } from "./search-tab-layout";
import { RecentProductsTab } from "./recent-products-tab";
import { useI18n } from "../i18n";
import { useSelectedProducts } from "../model/selected-products.store";
import type { MealType } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";

interface SearchProductsTabProps {
  onAddProducts: () => void;
  onShowCreateForm: () => void;
  isPending: boolean;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  mealType: MealType;
}

export function SearchProductsTab({
  onAddProducts,
  onShowCreateForm,
  isPending,
  searchQuery,
  onSearchQueryChange,
  mealType,
}: SearchProductsTabProps) {
  const { t } = useI18n();
  const { products: selectedProducts, isValid } = useSelectedProducts();
  const selectedCount = selectedProducts.size;

  const { setSearchQuery, products, isLoading, isEmpty } = useSearchProducts({
    limit: 100,
    initialQuery: searchQuery,
    onQueryChange: onSearchQueryChange,
  });

  const [activeSubTab, setActiveSubTab] = useState<"recent" | "search">(
    "recent",
  );

  const searchContent = (
    <SearchTabLayout
      isLoading={isLoading}
      isEmpty={isEmpty}
      hasContent={products.length > 0}
      searchInput={
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t("searchPlaceholder")}
        />
      }
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
      footer={
        selectedCount > 0 && !products.length && (
          <div className="flex justify-end mt-auto shrink-0">
            <Button onClick={onAddProducts} disabled={isPending || !isValid()}>
              {t("addSelected", { count: String(selectedCount) })}
            </Button>
          </div>
        )
      }
    />
  );

  return (
    <Tabs
      value={activeSubTab}
      onValueChange={(v) => setActiveSubTab(v as "recent" | "search")}
      className="w-full flex-1 min-h-0 flex flex-col"
    >
      <TabsList className="grid w-full grid-cols-2 shrink-0">
        <TabsTrigger value="recent" className="gap-1.5">
          <Clock className="size-4" />
          Недавние
        </TabsTrigger>
        <TabsTrigger value="search" className="gap-1.5">
          <Search className="size-4" />
          Поиск
        </TabsTrigger>
      </TabsList>
      <TabsContent value="recent" className="flex-1 flex flex-col min-h-0">
        <RecentProductsTab
          mealType={mealType}
          onAddProducts={onAddProducts}
          onShowCreateForm={onShowCreateForm}
          isPending={isPending}
        />
      </TabsContent>
      <TabsContent value="search" className="flex-1 flex flex-col min-h-0">
        {searchContent}
      </TabsContent>
    </Tabs>
  );
}
