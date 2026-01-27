"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import { DataTable } from "@/shared/ui/data-table";
import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useI18n } from "../i18n";
import { useSelectedProducts } from "@/features/day-data/create-meal/model/selected-products.store";
import {
  createProductsColumns,
  type ProductsTableMeta,
} from "./products-columns";

interface ProductsTableProps {
  products: Product[];
  onAddProducts?: () => void;
  onCreateProduct?: () => void;
  isPending?: boolean;
}

const PAGE_SIZE = 10;

export function ProductsTable({
  products,
  onAddProducts,
  onCreateProduct,
  isPending = false,
}: ProductsTableProps) {
  const { t } = useI18n();
  const [page, setPage] = useState(0);

  const {
    toggle,
    get: getSelected,
    products: selectedProducts,
    setQuantity,
    isValid,
  } = useSelectedProducts();

  const paginatedProducts = products.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE,
  );
  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const canGoNext = page < totalPages - 1;
  const canGoPrev = page > 0;

  const selectedCount = selectedProducts.size;

  const columns = useMemo(() => createProductsColumns(), []);

  const meta: ProductsTableMeta = {
    getSelected,
    toggle,
    setQuantity,
    onSubmit: isValid() ? onAddProducts : undefined,
    t,
  };

  if (products.length === 0) {
    return null;
  }

  const footer = (
    <>
      {totalPages > 1 && (
        <div className="flex items-center gap-1 self-end shrink-0">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => p - 1)}
              disabled={!canGoPrev}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => p + 1)}
              disabled={!canGoNext}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="w-full flex items-center justify-between mt-auto shrink-0">
        {onCreateProduct && (
          <Button variant="ghost" onClick={onCreateProduct}>
            {t("createProduct")}
            <ChevronRight size="20" />
          </Button>
        )}

        {onAddProducts && (
          <Button onClick={onAddProducts} disabled={isPending || !isValid()}>
            {t("addSelected", { count: String(selectedCount) })}
          </Button>
        )}
      </div>
    </>
  );

  return (
    <DataTable
      data={paginatedProducts}
      columns={columns}
      footer={footer}
      meta={meta}
      className="flex flex-col flex-1 min-h-0"
    />
  );
}
