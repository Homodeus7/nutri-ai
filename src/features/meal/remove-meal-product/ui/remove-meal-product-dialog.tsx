"use client";

import { ControlledDialog } from "@/shared/ui";
import type { RemoveMealProductDialogProps } from "../model/types";
import { useRemoveMealProduct } from "../model/use-remove-meal-product";
import { useI18n } from "../i18n";
import { RemoveMealProductConfirm } from "./remove-meal-product-confirm";

export function RemoveMealProductDialog({
  productId,
  productName,
  mealId,
  isOpen,
  onOpenChange,
}: RemoveMealProductDialogProps) {
  const { t } = useI18n();

  const { removeProduct, isPending } = useRemoveMealProduct({
    onSuccess: () => {
      onOpenChange(false);
    },
  });

  const handleConfirm = () => {
    removeProduct(mealId, productId);
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
      <RemoveMealProductConfirm
        productName={productName}
        isPending={isPending}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ControlledDialog>
  );
}
