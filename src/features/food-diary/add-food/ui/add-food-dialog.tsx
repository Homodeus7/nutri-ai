"use client";

import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/primitives/dialog";
import { useAddFoodDialog } from "../model/use-add-food-dialog";
import type { AddFoodDialogProps } from "../model/types";
import { TabsView } from "./tabs-view";
import { CreateView } from "./create-view";
import { useI18n } from "../i18n";

export function AddFoodDialog({ mealName, onAddFood }: AddFoodDialogProps) {
  const { t } = useI18n();

  const {
    state,
    open,
    close,
    switchToCreate,
    switchToSearch,
    handleProductsSelect,
    handleCreateProduct,
  } = useAddFoodDialog({ onAddFood });

  const dialogTitle =
    state.mode === "create"
      ? t("createProductTitle")
      : `${t("addFoodTo")} ${mealName.toLowerCase()}`;

  return (
    <Dialog
      open={state.isOpen}
      onOpenChange={(isOpen) => (isOpen ? open() : close())}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
          <Plus className="size-6 text-chart-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto flex flex-col items-start lg:min-h-[400px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>

        {state.mode === "create" ? (
          <CreateView
            onBack={switchToSearch}
            onCreate={handleCreateProduct}
            backButtonLabel={t("backToSearch")}
          />
        ) : (
          <TabsView
            onProductsSelect={handleProductsSelect}
            onSwitchToCreate={switchToCreate}
            searchTabLabel={t("searchTab")}
            recentTabLabel={t("recentTab")}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
