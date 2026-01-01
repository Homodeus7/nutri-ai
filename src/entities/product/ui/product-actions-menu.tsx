"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/primitives/dropdown-menu";

export interface ProductActionsMenuLabels {
  actions: string;
  edit: string;
  delete: string;
}

export interface ProductActionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  labels: ProductActionsMenuLabels;
  buttonVariant?: "ghost" | "outline";
  buttonClassName?: string;
  stopPropagation?: boolean;
}

export function ProductActionsMenu({
  onEdit,
  onDelete,
  labels,
  buttonVariant = "outline",
  buttonClassName,
  stopPropagation = false,
}: ProductActionsMenuProps) {
  const handleClick = stopPropagation
    ? (e: React.MouseEvent) => e.stopPropagation()
    : undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={buttonVariant}
          size="icon"
          className={buttonClassName}
          onClick={handleClick}
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">{labels.actions}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={handleClick}>
        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          {labels.edit}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {labels.delete}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
