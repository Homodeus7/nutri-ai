"use client";

import {
  DataTableToolbar,
  DataTableSearch,
} from "@/shared/ui/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/primitives/select";
import { ProductSource } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import type { ProductsFilters } from "../model/use-products-table";

interface ProductsFiltersProps {
  filters: ProductsFilters;
  onFiltersChange: (filters: Partial<ProductsFilters>) => void;
  searchPlaceholder?: string;
  sourceLabel?: string;
  categoryLabel?: string;
  allLabel?: string;
}

const SOURCE_OPTIONS = [
  { value: "", label: "All" },
  { value: ProductSource.manual, label: "Manual" },
  { value: ProductSource.ai, label: "AI" },
  { value: ProductSource.openfoodfacts, label: "OpenFoodFacts" },
  { value: ProductSource.user, label: "User" },
] as const;

export function ProductsFiltersToolbar({
  filters,
  onFiltersChange,
  searchPlaceholder = "Search products...",
  allLabel = "All",
}: ProductsFiltersProps) {
  return (
    <DataTableToolbar>
      <DataTableSearch
        value={filters.search}
        onChange={(search) => onFiltersChange({ search })}
        placeholder={searchPlaceholder}
      />

      <div className="flex items-center gap-2">
        <Select
          value={filters.source}
          onValueChange={(value) =>
            onFiltersChange({
              source: value as ProductsFilters["source"],
            })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            {SOURCE_OPTIONS.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value || "all"}
              >
                {option.value === "" ? allLabel : option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.category}
          onValueChange={(value) =>
            onFiltersChange({
              category: value === "all" ? "" : value,
            })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{allLabel}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </DataTableToolbar>
  );
}
