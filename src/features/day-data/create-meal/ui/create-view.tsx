"use client";

import { Button } from "@/shared/ui/primitives/button";
import { CreateProductForm } from "@/features/product/create-product";

interface CreateViewProps {
  onBack: () => void;
  backButtonLabel: string;
  initialName?: string;
}

export function CreateView({
  onBack,
  backButtonLabel,
  initialName,
}: CreateViewProps) {
  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col">
      <div className="shrink-0">
        <Button variant="ghost" size="sm" onClick={onBack}>
          {backButtonLabel}
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:thin]">
        <CreateProductForm onSuccess={onBack} initialName={initialName} />
      </div>
    </div>
  );
}
