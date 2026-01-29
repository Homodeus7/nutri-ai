"use client";

import { useRef, useEffect } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/shared/ui/primitives/checkbox";
import { Input } from "@/shared/ui/primitives/input";
import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import type { SelectedProduct } from "@/features/day-data/create-meal/model/selected-products.store";

export interface ProductsTableMeta {
  getSelected: (productId: string) => SelectedProduct | undefined;
  toggle: (product: Product) => void;
  setQuantity: (productId: string, value: number | null) => void;
  onSubmit?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: any, params?: Record<string, string>) => string;
}

const columnHelper = createColumnHelper<Product>();

function QuantityCell({
  product,
  meta,
}: {
  product: Product;
  meta: ProductsTableMeta;
}) {
  const productId = String(product.id);
  const selected = meta.getSelected(productId);
  const isSelected = !!selected;
  const inputRef = useRef<HTMLInputElement>(null);
  const wasSelected = useRef(isSelected);

  useEffect(() => {
    if (isSelected && !wasSelected.current) {
      inputRef.current?.focus();
    }
    wasSelected.current = isSelected;
  }, [isSelected]);

  if (!isSelected) return null;

  return (
    <div className="flex items-center gap-1.5 justify-end">
      <Input
        ref={inputRef}
        type="number"
        min={1}
        className="w-16 text-right"
        value={selected?.quantity ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          meta.setQuantity(productId, value === "" ? null : Number(value));
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            meta.onSubmit?.();
          }
        }}
      />
      <span className="text-muted-foreground text-sm">г</span>
    </div>
  );
}

export function createProductsColumns() {
  return [
    columnHelper.display({
      id: "select",
      header: () => null,
      cell: ({ row, table }) => {
        const meta = table.options.meta as ProductsTableMeta;
        const productId = String(row.original.id);
        const isSelected = !!meta.getSelected(productId);
        return (
          <div onClick={() => meta.toggle(row.original)}>
            <Checkbox checked={isSelected} />
          </div>
        );
      },
      size: 48,
    }),
    columnHelper.accessor("name", {
      header: ({ table }) => (table.options.meta as ProductsTableMeta).t("productName"),
      cell: ({ getValue, row, table }) => {
        const meta = table.options.meta as ProductsTableMeta;
        return (
          <span
            className="font-medium cursor-pointer min-w-[120px] break-words inline-block"
            onClick={() => meta.toggle(row.original)}
          >
            {getValue()}
          </span>
        );
      },
    }),
    columnHelper.display({
      id: "quantity",
      header: ({ table }) => (
        <span className="text-right block">
          {(table.options.meta as ProductsTableMeta).t("quantity")}
        </span>
      ),
      cell: ({ row, table }) => {
        const meta = table.options.meta as ProductsTableMeta;
        return <QuantityCell product={row.original} meta={meta} />;
      },
      size: 96,
    }),
    columnHelper.accessor("kcalPer100g", {
      header: ({ table }) => (
        <span className="text-right block">
          {(table.options.meta as ProductsTableMeta).t("kcalPer100g")}
        </span>
      ),
      cell: ({ getValue, row, table }) => {
        const meta = table.options.meta as ProductsTableMeta;
        return (
          <span
            className="text-right block cursor-pointer"
            onClick={() => meta.toggle(row.original)}
          >
            {getValue()}
          </span>
        );
      },
    }),
    columnHelper.accessor("proteinPer100g", {
      header: ({ table }) => (
        <span className="text-right block">
          {(table.options.meta as ProductsTableMeta).t("protein")}
        </span>
      ),
      cell: ({ getValue, row, table }) => {
        const meta = table.options.meta as ProductsTableMeta;
        return (
          <span
            className="text-right block cursor-pointer"
            onClick={() => meta.toggle(row.original)}
          >
            {getValue()?.toFixed(1) || "-"}
          </span>
        );
      },
    }),
    columnHelper.accessor("fatPer100g", {
      header: ({ table }) => (
        <span className="text-right block">
          {(table.options.meta as ProductsTableMeta).t("fat")}
        </span>
      ),
      cell: ({ getValue, row, table }) => {
        const meta = table.options.meta as ProductsTableMeta;
        return (
          <span
            className="text-right block cursor-pointer"
            onClick={() => meta.toggle(row.original)}
          >
            {getValue()?.toFixed(1) || "-"}
          </span>
        );
      },
    }),
    columnHelper.accessor("carbsPer100g", {
      header: ({ table }) => (
        <span className="text-right block">
          {(table.options.meta as ProductsTableMeta).t("carbs")}
        </span>
      ),
      cell: ({ getValue, row, table }) => {
        const meta = table.options.meta as ProductsTableMeta;
        return (
          <span
            className="text-right block cursor-pointer"
            onClick={() => meta.toggle(row.original)}
          >
            {getValue()?.toFixed(1) || "-"}
          </span>
        );
      },
    }),
  ];
}
