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
import { useCreateMealDialog } from "../model/use-create-meal-dialog";
import type { CreateMealDialogProps } from "../model/types";
import { TabsView } from "./tabs-view";
import { CreateView } from "./create-view";
import { useI18n } from "../i18n";

export function CreateMealDialog({
  date,
  mealType,
  mealName,
}: CreateMealDialogProps) {
  const { t } = useI18n();

  const {
    state,
    setOpen,
    switchToCreate,
    switchToSearch,
    handleAddProducts,
    handleCreateProduct,
    isPending,
  } = useCreateMealDialog({ date, mealType });

  const dialogTitle =
    state.mode === "create"
      ? t("createProductTitle")
      : `${t("addFoodTo")} ${mealName.toLowerCase()}`;

  return (
    <Dialog open={state.isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full"
          disabled={isPending}
        >
          <Plus className="size-7 text-chart-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col h-[500px] min-h-[400px] max-h-[500px]">
        <DialogHeader className="shrink-0">
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
            date={date}
            mealType={mealType}
            onAddProducts={handleAddProducts}
            onSwitchToCreate={switchToCreate}
            searchTabLabel={t("searchTab")}
            recentTabLabel={t("recentTab")}
            isPending={isPending}
            onClose={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
