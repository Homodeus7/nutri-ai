"use client";

import { toast } from "sonner";
import { ControlledDialog } from "@/shared/ui";
import type { DeleteProductDialogProps } from "../model/types";
import { useDeleteProduct } from "../model/use-delete-product";
import { useI18n } from "../i18n";
import { DeleteProductConfirm } from "./delete-product-confirm";

export function DeleteProductDialog({
  productId,
  productName,
  isOpen,
  onOpenChange,
  onSuccess,
}: DeleteProductDialogProps) {
  const { t } = useI18n();

  const { deleteProduct, isPending } = useDeleteProduct({
    onSuccess: () => {
      toast.success(t("successMessage"));
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || t("errorMessage"));
    },
  });

  const handleConfirm = () => {
    deleteProduct(productId);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <ControlledDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={t("title")}
      contentClassName="sm:max-w-[425px]"
    >
      <DeleteProductConfirm
        productName={productName}
        isPending={isPending}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ControlledDialog>
  );
}
