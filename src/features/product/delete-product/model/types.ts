export interface DeleteProductDialogProps {
  productId: string;
  productName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}
