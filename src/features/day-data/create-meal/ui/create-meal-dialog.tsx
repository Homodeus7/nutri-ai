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
import { useAiParse } from "@/features/ai-parse";

export function CreateMealDialog({
  date,
  mealType,
  mealName,
}: CreateMealDialogProps) {
  const { t } = useI18n();

  const {
    mode,
    isOpen,
    setOpen,
    switchToCreate,
    switchToSearch,
    handleAddProducts,
    isPending,
    createProductName,
  } = useCreateMealDialog({ date, mealType });

  const {
    parseText,
    isPending: isAiPending,
    errorCode: aiErrorCode,
    clearError: clearAiError,
  } = useAiParse({
    date,
    mealType,
    onSuccess: () => {
      setOpen(false);
    },
  });

  const dialogTitle =
    mode === "create"
      ? t("createProductTitle")
      : `${t("addFoodTo")} ${mealName.toLowerCase()}`;

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
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
      <DialogContent className="flex flex-col h-[500px] min-h-[400px] max-h-[500px] overflow-hidden">
        <DialogHeader className="shrink-0">
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>

        {mode === "create" ? (
          <CreateView
            onBack={switchToSearch}
            backButtonLabel={t("backToSearch")}
            initialName={createProductName}
          />
        ) : (
          <TabsView
            onAddProducts={handleAddProducts}
            onSwitchToCreate={switchToCreate}
            searchTabLabel={t("searchTab")}
            isPending={isPending}
            aiParseText={parseText}
            isAiPending={isAiPending}
            aiErrorCode={aiErrorCode}
            onClearAiError={clearAiError}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
