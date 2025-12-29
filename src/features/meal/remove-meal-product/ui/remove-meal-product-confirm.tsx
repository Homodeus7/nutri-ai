"use client";

import { Button } from "@/shared/ui/primitives/button";
import { DialogDescription, DialogFooter } from "@/shared/ui/primitives/dialog";
import { useI18n } from "../i18n";
import { UI } from "react-day-picker";
import { UiText } from "@/shared/ui";

export interface RemoveMealProductConfirmProps {
  productName: string;
  isPending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function RemoveMealProductConfirm({
  productName,
  isPending,
  onConfirm,
  onCancel,
}: RemoveMealProductConfirmProps) {
  const { t } = useI18n();

  return (
    <>
      <DialogDescription>
        {t("description")}
        <UiText variant="large" className="text-primary pt-4">
          {productName}
        </UiText>
      </DialogDescription>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
        >
          {t("cancel")}
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={onConfirm}
          disabled={isPending}
        >
          {t("delete")}
        </Button>
      </DialogFooter>
    </>
  );
}
