"use client";

import { createColumnHelper } from "@tanstack/react-table";
import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import { SortableHeader } from "@/shared/ui/data-table";

const columnHelper = createColumnHelper<Product>();

export interface ProductsColumnsLabels {
  name: string;
  kcal: string;
  protein: string;
  fat: string;
  carbs: string;
  source: string;
  category: string;
}

export const createProductsColumns = (labels: ProductsColumnsLabels) => [
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <SortableHeader column={column}>{labels.name}</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  }),

  columnHelper.accessor("kcalPer100g", {
    header: ({ column }) => (
      <SortableHeader column={column}>{labels.kcal}</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("kcalPer100g")}</div>
    ),
  }),

  columnHelper.accessor("proteinPer100g", {
    header: () => <div className="text-right">{labels.protein}</div>,
    cell: ({ row }) => {
      const value = row.getValue("proteinPer100g") as number | undefined;
      return <div className="text-right">{value?.toFixed(1) ?? "-"}</div>;
    },
  }),

  columnHelper.accessor("fatPer100g", {
    header: () => <div className="text-right">{labels.fat}</div>,
    cell: ({ row }) => {
      const value = row.getValue("fatPer100g") as number | undefined;
      return <div className="text-right">{value?.toFixed(1) ?? "-"}</div>;
    },
  }),

  columnHelper.accessor("carbsPer100g", {
    header: () => <div className="text-right">{labels.carbs}</div>,
    cell: ({ row }) => {
      const value = row.getValue("carbsPer100g") as number | undefined;
      return <div className="text-right">{value?.toFixed(1) ?? "-"}</div>;
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
      return (
        <span className="text-muted-foreground">{category ?? "-"}</span>
      );
    },
  }),
];
