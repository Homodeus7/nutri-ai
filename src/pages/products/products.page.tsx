"use client";

import { useMemo, useState, useCallback } from "react";
import { UiText } from "@/shared/ui/ui-text";
import { DataTable } from "@/shared/ui/data-table";
import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { EditProductDialog } from "@/features/product/edit-product";
import { DeleteProductDialog } from "@/features/product/delete-product";
import { useProductsTable } from "./model/use-products-table";
import { createProductsColumns } from "./ui/products-columns";
import { ProductsFiltersToolbar } from "./ui/products-filters";
import { useI18n } from "./i18n";

export function ProductsPage() {
  const { t } = useI18n();

  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

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

  const handleEdit = useCallback((product: Product) => {
    setEditProduct(product);
  }, []);

  const handleDelete = useCallback((product: Product) => {
    setDeleteProduct(product);
  }, []);

  const columnLabels = useMemo(
    () => ({
      name: t("name"),
      kcal: t("kcal"),
      protein: t("protein"),
      fat: t("fat"),
      carbs: t("carbs"),
      fiber: t("fiber"),
      source: t("source"),
      category: t("category"),
      actions: t("actions"),
      edit: t("edit"),
      delete: t("delete"),
    }),
    [t],
  );

  const columnCallbacks = useMemo(
    () => ({
      onEdit: handleEdit,
      onDelete: handleDelete,
    }),
    [handleEdit, handleDelete],
  );

  const columns = useMemo(
    () => createProductsColumns(columnLabels, columnCallbacks),
    [columnLabels, columnCallbacks],
  );

  return (
    <>
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

      {editProduct && (
        <EditProductDialog
          product={editProduct}
          isOpen={!!editProduct}
          onOpenChange={(open) => !open && setEditProduct(null)}
        />
      )}

      {deleteProduct && (
        <DeleteProductDialog
          productId={deleteProduct.id}
          productName={deleteProduct.name}
          isOpen={!!deleteProduct}
          onOpenChange={(open) => !open && setDeleteProduct(null)}
        />
      )}
    </>
  );
}
