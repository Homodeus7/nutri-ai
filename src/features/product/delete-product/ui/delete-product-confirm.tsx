"use client";

import { Button } from "@/shared/ui/primitives/button";
import {
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/primitives/dialog";
import { UiText } from "@/shared/ui";
import { useI18n } from "../i18n";

export interface DeleteProductConfirmProps {
  productName: string;
  isPending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteProductConfirm({
  productName,
  isPending,
  onConfirm,
  onCancel,
}: DeleteProductConfirmProps) {
  const { t } = useI18n();

  return (
    <>
      <DialogDescription>
        {t("description")}
        <UiText as="span" variant="large" className="text-primary pt-4 block">
          {productName}
        </UiText>
      </DialogDescription>
      <DialogFooter className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
        >
          {t("cancelButton")}
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={onConfirm}
          disabled={isPending}
        >
          {t("deleteButton")}
        </Button>
      </DialogFooter>
    </>
  );
}
