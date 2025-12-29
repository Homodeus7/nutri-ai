"use client";

import { ControlledDialog } from "@/shared/ui";
import type { UpdateMealProductDialogProps } from "../model/types";
import { useUpdateMealProduct } from "../model/use-update-meal-product";
import { useI18n } from "../i18n";
import { UpdateMealProductForm } from "./update-meal-product-form";

export function UpdateMealProductDialog({
  productId,
  productName,
  currentQuantity,
  mealId,
  isOpen,
  onOpenChange,
}: UpdateMealProductDialogProps) {
  const { t } = useI18n();

  const { updateProduct, isPending } = useUpdateMealProduct({
    onSuccess: () => {
      onOpenChange(false);
    },
  });

  const handleSubmit = (quantity: number) => {
    console.log({ mealId, productId, quantity });
    updateProduct(mealId, productId, quantity);
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
      <UpdateMealProductForm
        productName={productName}
        currentQuantity={currentQuantity}
        isPending={isPending}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </ControlledDialog>
  );
}
