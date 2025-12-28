"use client";

import { Button } from "@/shared/ui/primitives/button";
import {
  CreateProductForm,
  type ProductItemData,
} from "@/features/product/create-product";

interface CreateViewProps {
  onBack: () => void;
  onCreate: (data: ProductItemData) => void;
  backButtonLabel: string;
}

export function CreateView({
  onBack,
  onCreate,
  backButtonLabel,
}: CreateViewProps) {
  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={onBack}>
        {backButtonLabel}
      </Button>
      <CreateProductForm onSuccess={onCreate} />
    </div>
  );
}
