export interface RemoveMealProductDialogProps {
  productId: string;
  productName: string;
  mealId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
