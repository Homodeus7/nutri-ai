"use client";

import { createColumnHelper } from "@tanstack/react-table";
import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { ProductActionsMenu } from "@/entities/product";

const columnHelper = createColumnHelper<Product>();

export interface ProductsColumnsLabels {
  name: string;
  kcal: string;
  protein: string;
  fat: string;
  carbs: string;
  fiber: string;
  source: string;
  category: string;
  actions: string;
  edit: string;
  delete: string;
}

export interface ProductsColumnsCallbacks {
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const createProductsColumns = (
  labels: ProductsColumnsLabels,
  callbacks: ProductsColumnsCallbacks
) => [
  columnHelper.accessor("name", {
    header: () => <div>{labels.name}</div>,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  }),

  columnHelper.accessor("kcalPer100g", {
    header: () => <div>{labels.kcal}</div>,
    cell: ({ row }) => <div>{row.getValue("kcalPer100g")}</div>,
  }),

  columnHelper.accessor("proteinPer100g", {
    header: () => <div>{labels.protein}</div>,
    cell: ({ row }) => {
      const value = row.getValue("proteinPer100g") as number | undefined;
      return <div>{value?.toFixed(1) ?? "-"}</div>;
    },
  }),

  columnHelper.accessor("fatPer100g", {
    header: () => <div>{labels.fat}</div>,
    cell: ({ row }) => {
      const value = row.getValue("fatPer100g") as number | undefined;
      return <div>{value?.toFixed(1) ?? "-"}</div>;
    },
  }),

  columnHelper.accessor("carbsPer100g", {
    header: () => <div>{labels.carbs}</div>,
    cell: ({ row }) => {
      const value = row.getValue("carbsPer100g") as number | undefined;
      return <div>{value?.toFixed(1) ?? "-"}</div>;
    },
  }),

  columnHelper.accessor("fiberPer100g", {
    header: () => <div>{labels.fiber}</div>,
    cell: ({ row }) => {
      const value = row.getValue("fiberPer100g") as number | undefined;
      return <div>{value?.toFixed(1) ?? "-"}</div>;
    },
  }),

  columnHelper.accessor("source", {
    header: () => labels.source,
    cell: ({ row }) => {
      const source = row.getValue("source") as string | undefined;
      if (!source) return "-";
      return (
        <span className="text-sm text-muted-foreground capitalize">
          {source}
        </span>
      );
    },
  }),

  columnHelper.accessor("category", {
    header: () => labels.category,
    cell: ({ row }) => {
      const category = row.getValue("category") as string | undefined;
      return <span className="text-muted-foreground">{category ?? "-"}</span>;
    },
  }),

  columnHelper.display({
    id: "actions",
    header: () => <div className="text-right">{labels.actions}</div>,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="text-right">
          <ProductActionsMenu
            onEdit={() => callbacks.onEdit(product)}
            onDelete={() => callbacks.onDelete(product)}
            labels={{
              actions: labels.actions,
              edit: labels.edit,
              delete: labels.delete,
            }}
            buttonVariant="ghost"
            buttonClassName="h-8 w-8"
            stopPropagation
          />
        </div>
      );
    },
  }),
];
