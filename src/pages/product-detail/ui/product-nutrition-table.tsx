"use client";

import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/shared/ui/primitives/table";

interface ProductNutritionTableProps {
  product: Product;
  labels: {
    kcal: string;
    protein: string;
    fat: string;
    carbs: string;
    fiber: string;
    sugar: string;
  };
}

export function ProductNutritionTable({
  product,
  labels,
}: ProductNutritionTableProps) {
  const rows = [
    { label: labels.kcal, value: product.kcalPer100g, unit: "kcal" },
    { label: labels.protein, value: product.proteinPer100g, unit: "g" },
    { label: labels.fat, value: product.fatPer100g, unit: "g" },
    { label: labels.carbs, value: product.carbsPer100g, unit: "g" },
    { label: labels.fiber, value: product.fiberPer100g, unit: "g" },
    { label: labels.sugar, value: product.sugarPer100g, unit: "g" },
  ];

  return (
    <Table>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.label}>
            <TableCell className="font-medium">{row.label}</TableCell>
            <TableCell className="text-right">
              {row.value != null ? `${row.value} ${row.unit}` : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
