import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";

export interface EditProductDialogProps {
  product: Product;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
