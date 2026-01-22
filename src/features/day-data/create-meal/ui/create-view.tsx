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
    <div className="flex h-full min-h-0 w-full flex-1 flex-col">
      <div className="shrink-0">
        <Button variant="ghost" size="sm" onClick={onBack}>
          {backButtonLabel}
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:thin]">
        <CreateProductForm onSuccess={onCreate} />
      </div>
    </div>
  );
}
