// Query
export { useGetMeal } from "./get-meal";

// Mutations
export { useUpdateMeal } from "./update-meal";
export { useDeleteMeal } from "./delete-meal";

// Meal Products
export {
  useUpdateMealProduct,
  UpdateMealProductDialog,
} from "./update-meal-product";
export type { UpdateMealProductDialogProps } from "./update-meal-product";

export {
  useRemoveMealProduct,
  RemoveMealProductDialog,
} from "./remove-meal-product";
export type { RemoveMealProductDialogProps } from "./remove-meal-product";
