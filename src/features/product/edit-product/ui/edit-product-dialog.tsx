"use client";

import { toast } from "sonner";
import { ControlledDialog } from "@/shared/ui";
import type { EditProductDialogProps } from "../model/types";
import { useUpdateProduct } from "../model/use-update-product";
import { useI18n } from "../i18n";
import { EditProductForm, type EditProductFormData } from "./edit-product-form";

export function EditProductDialog({
  product,
  isOpen,
  onOpenChange,
}: EditProductDialogProps) {
  const { t } = useI18n();

  const { updateProduct, isPending } = useUpdateProduct({
    onSuccess: () => {
      toast.success(t("successMessage"));
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error.message || t("errorMessage"));
    },
  });

  const handleSubmit = (data: EditProductFormData) => {
    const payload = {
      name: data.name,
      kcalPer100g: data.kcalPer100g,
      ...(data.proteinPer100g !== "" && {
        proteinPer100g: Number(data.proteinPer100g),
      }),
      ...(data.fatPer100g !== "" && { fatPer100g: Number(data.fatPer100g) }),
      ...(data.carbsPer100g !== "" && {
        carbsPer100g: Number(data.carbsPer100g),
      }),
      ...(data.fiberPer100g !== "" && {
        fiberPer100g: Number(data.fiberPer100g),
      }),
      ...(data.sugarPer100g !== "" && {
        sugarPer100g: Number(data.sugarPer100g),
      }),
      ...(data.barcode && { barcode: data.barcode }),
      ...(data.brand && { brand: data.brand }),
      ...(data.category && { category: data.category }),
    };

    updateProduct(product.id, payload);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <ControlledDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={t("title")}
      contentClassName="sm:max-w-[500px]"
    >
      <EditProductForm
        product={product}
        isPending={isPending}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </ControlledDialog>
  );
}
