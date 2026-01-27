"use client";

import { DataTableToolbar } from "@/shared/ui/data-table";
import { SearchInput } from "@/shared/ui";
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
      <SearchInput
        value={filters.search}
        onChange={(search) => onFiltersChange({ search })}
        placeholder={searchPlaceholder}
        className="relative flex-1 md:max-w-sm"
      />

      <div className="flex items-center gap-2 w-full md:w-auto">
        <Select
          value={filters.source}
          onValueChange={(value) =>
            onFiltersChange({
              source: value as ProductsFilters["source"],
            })
          }
        >
          <SelectTrigger className="w-full md:w-[140px]">
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
          <SelectTrigger className="w-full md:w-[140px]">
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
