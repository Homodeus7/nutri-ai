"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/primitives/table";
import { Checkbox } from "@/shared/ui/primitives/checkbox";
import { Input } from "@/shared/ui/primitives/input";
import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useI18n } from "../i18n";
import {
  useSelectedProducts,
  type SelectedProduct,
} from "@/features/day-data/create-meal/model/selected-products.store";
import { cn } from "@/shared/lib/css";

interface ProductRowProps {
  product: Product;
  selected: SelectedProduct | undefined;
  isSelected: boolean;
  onToggle: () => void;
  onQuantityChange: (value: number | null) => void;
}

function ProductRow({
  product,
  selected,
  isSelected,
  onToggle,
  onQuantityChange,
}: ProductRowProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const wasSelected = useRef(isSelected);

  useEffect(() => {
    if (isSelected && !wasSelected.current) {
      inputRef.current?.focus();
    }
    wasSelected.current = isSelected;
  }, [isSelected]);

  return (
    <TableRow className={cn("cursor-pointer", isSelected && "bg-muted/50")}>
      <TableCell onClick={onToggle}>
        <Checkbox checked={isSelected} />
      </TableCell>
      <TableCell className="font-medium" onClick={onToggle}>
        {product.name}
      </TableCell>
      <TableCell>
        {isSelected ? (
          <div className="flex items-center gap-1.5 justify-end">
            <Input
              ref={inputRef}
              type="number"
              min={1}
              className="w-16 text-right"
              value={selected?.quantity ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                onQuantityChange(value === "" ? null : Number(value));
              }}
            />
            <span className="text-muted-foreground text-sm">г</span>
          </div>
        ) : null}
      </TableCell>
      <TableCell className="text-right" onClick={onToggle}>
        {product.kcalPer100g}
      </TableCell>
      <TableCell className="text-right" onClick={onToggle}>
        {product.proteinPer100g?.toFixed(1) || "-"}
      </TableCell>
      <TableCell className="text-right" onClick={onToggle}>
        {product.fatPer100g?.toFixed(1) || "-"}
      </TableCell>
      <TableCell className="text-right" onClick={onToggle}>
        {product.carbsPer100g?.toFixed(1) || "-"}
      </TableCell>
    </TableRow>
  );
}

interface ProductsTableProps {
  products: Product[];
  onAddProducts?: () => void;
  onCreateProduct?: () => void;
  isPending?: boolean;
}

export function ProductsTable({
  products,
  onAddProducts,
  onCreateProduct,
  isPending = false,
}: ProductsTableProps) {
  const { t } = useI18n();
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const {
    toggle,
    get: getSelected,
    products: selectedProducts,
    setQuantity,
    isValid,
  } = useSelectedProducts();

  const paginatedProducts = products.slice(
    page * pageSize,
    (page + 1) * pageSize,
  );
  const totalPages = Math.ceil(products.length / pageSize);
  const canGoNext = page < totalPages - 1;
  const canGoPrev = page > 0;

  const selectedCount = selectedProducts.size;

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto min-h-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12" />
              <TableHead>{t("productName")}</TableHead>
              <TableHead className="w-24 text-right">{t("quantity")}</TableHead>
              <TableHead className="text-right">{t("kcalPer100g")}</TableHead>
              <TableHead className="text-right">{t("protein")}</TableHead>
              <TableHead className="text-right">{t("fat")}</TableHead>
              <TableHead className="text-right">{t("carbs")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.map((product) => {
              const productId = String(product.id);
              const selected = getSelected(productId);
              const isSelected = !!selected;

              return (
                <ProductRow
                  key={product.id}
                  product={product}
                  selected={selected}
                  isSelected={isSelected}
                  onToggle={() => toggle(product)}
                  onQuantityChange={(value) => setQuantity(productId, value)}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-1 self-end">
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

      <div className="w-full flex items-center justify-between mt-auto">
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
    </div>
  );
}
