"use client";

import { useMemo } from "react";
import { UiText } from "@/shared/ui/ui-text";
import { DataTable } from "@/shared/ui/data-table";
import { useProductsTable } from "./model/use-products-table";
import { createProductsColumns } from "./ui/products-columns";
import { ProductsFiltersToolbar } from "./ui/products-filters";
import { useI18n } from "./i18n";

export function ProductsPage() {
  const { t } = useI18n();

  const {
    products,
    total,
    pagination,
    handlePaginationChange,
    pageCount,
    filters,
    updateFilters,
    isLoading,
    handleRowClick,
  } = useProductsTable();

  const columnLabels = useMemo(
    () => ({
      name: t("name"),
      kcal: t("kcal"),
      protein: t("protein"),
      fat: t("fat"),
      carbs: t("carbs"),
      source: t("source"),
      category: t("category"),
    }),
    [t],
  );

  const columns = useMemo(
    () => createProductsColumns(columnLabels),
    [columnLabels],
  );

  return (
    <div className="space-y-4">
      <div>
        <UiText variant="h1" weight="bold">
          {t("title")}
        </UiText>
        <UiText variant="muted" className="pt-4">
          {t("description")}
        </UiText>
      </div>

      <ProductsFiltersToolbar
        filters={filters}
        onFiltersChange={updateFilters}
        searchPlaceholder={t("searchPlaceholder")}
        allLabel={t("all")}
      />

      <DataTable
        data={products}
        columns={columns}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        pageCount={pageCount}
        isLoading={isLoading}
        onRowClick={handleRowClick}
        emptyState={
          <div className="text-center py-12 text-muted-foreground">
            {t("noProducts")}
          </div>
        }
      />
    </div>
  );
}
