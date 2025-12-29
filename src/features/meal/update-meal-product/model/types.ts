export interface UpdateMealProductDialogProps {
  productId: string;
  productName: string;
  currentQuantity: number;
  mealId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
