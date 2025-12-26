"use client";

import { useState } from "react";
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
import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { useI18n } from "../i18n";

interface ProductsTableProps {
  products: Product[];
  onSelectProducts: (products: Product[]) => void;
  onCreateProduct?: () => void;
}

export function ProductsTable({
  products,
  onSelectProducts,
  onCreateProduct,
}: ProductsTableProps) {
  const { t } = useI18n();
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set(),
  );
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const paginatedProducts = products.slice(
    page * pageSize,
    (page + 1) * pageSize,
  );
  const totalPages = Math.ceil(products.length / pageSize);
  const canGoNext = page < totalPages - 1;
  const canGoPrev = page > 0;

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const handleAddSelectedProducts = () => {
    const selected = products.filter((p) =>
      selectedProducts.has(String(p.id)),
    );
    onSelectProducts(selected);
    setSelectedProducts(new Set());
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12" />
            <TableHead>{t("productName")}</TableHead>
            <TableHead className="text-right">{t("kcalPer100g")}</TableHead>
            <TableHead className="text-right">{t("protein")}</TableHead>
            <TableHead className="text-right">{t("fat")}</TableHead>
            <TableHead className="text-right">{t("carbs")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProducts.map((product) => {
            const isSelected = selectedProducts.has(String(product.id));
            return (
              <TableRow
                key={product.id}
                onClick={() => toggleProductSelection(String(product.id))}
                className="cursor-pointer"
              >
                <TableCell>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() =>
                      toggleProductSelection(String(product.id))
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-right">
                  {product.kcalPer100g}
                </TableCell>
                <TableCell className="text-right">
                  {product.proteinPer100g?.toFixed(1) || "-"}
                </TableCell>
                <TableCell className="text-right">
                  {product.fatPer100g?.toFixed(1) || "-"}
                </TableCell>
                <TableCell className="text-right">
                  {product.carbsPer100g?.toFixed(1) || "-"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {onCreateProduct && (
        <div className="flex justify-center py-2">
          <Button variant="ghost" onClick={onCreateProduct}>
            {t("createProduct")}
            <ChevronRight size="20" />
          </Button>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        {totalPages > 1 && (
          <>
            <div className="text-sm text-muted-foreground">
              {t("pageOf", { page: String(page + 1), total: String(totalPages) })}
            </div>
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
          </>
        )}
        {selectedProducts.size > 0 && (
          <Button onClick={handleAddSelectedProducts} className="ml-auto">
            {t("addSelected", { count: String(selectedProducts.size) })}
          </Button>
        )}
      </div>
    </>
  );
}
