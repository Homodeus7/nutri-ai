import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/primitives/dialog";
import { CreateFoodForm, type FoodItemData } from "@/features/food/create-food";
import type { AddFoodFormData } from "../model/types";
import { useI18n } from "../i18n";

interface AddFoodDialogProps {
  mealName: string;
  onAddFood: (formData: AddFoodFormData) => void;
}

export function AddFoodDialog({ mealName, onAddFood }: AddFoodDialogProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = (foodItemData: FoodItemData) => {
    // Convert FoodItemData to AddFoodFormData format
    const formData: AddFoodFormData = {
      name: foodItemData.name,
      calories: String(foodItemData.calories),
      protein: String(foodItemData.protein),
      fat: String(foodItemData.fat),
      carbs: String(foodItemData.carbs),
    };

    // Add to meal (updates local state)
    onAddFood(formData);

    // Close dialog
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
          <Plus className="size-6 text-chart-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("addFoodTo")} {mealName.toLowerCase()}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <CreateFoodForm onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
