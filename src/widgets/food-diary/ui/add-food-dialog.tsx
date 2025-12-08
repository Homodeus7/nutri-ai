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
import { Input } from "@/shared/ui/primitives/input";
import { Label } from "@/shared/ui/primitives/label";
import type { AddFoodFormData } from "../model/types";
import { useI18n } from "../i18n";

interface AddFoodDialogProps {
  mealName: string;
  onAddFood: (formData: AddFoodFormData) => void;
}

const INITIAL_FORM_DATA: AddFoodFormData = {
  name: "",
  calories: "",
  protein: "",
  fat: "",
  carbs: "",
};

export function AddFoodDialog({ mealName, onAddFood }: AddFoodDialogProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<AddFoodFormData>(INITIAL_FORM_DATA);

  const handleSubmit = () => {
    if (!formData.name) return;

    onAddFood(formData);
    setFormData(INITIAL_FORM_DATA);
    setIsOpen(false);
  };

  const updateField = (field: keyof AddFoodFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-background/50 hover:bg-background/80"
        >
          <Plus className="size-6 text-chart-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("addFoodTo")} {mealName.toLowerCase()}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">{t("foodName")}</Label>
            <Input
              id="name"
              placeholder={t("foodNamePlaceholder")}
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="calories">{t("caloriesLabel")}</Label>
              <Input
                id="calories"
                type="number"
                placeholder="0"
                value={formData.calories}
                onChange={(e) => updateField("calories", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="protein">{t("proteinLabel")}</Label>
              <Input
                id="protein"
                type="number"
                placeholder="0"
                value={formData.protein}
                onChange={(e) => updateField("protein", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fat">{t("fatLabel")}</Label>
              <Input
                id="fat"
                type="number"
                placeholder="0"
                value={formData.fat}
                onChange={(e) => updateField("fat", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="carbs">{t("carbsLabel")}</Label>
              <Input
                id="carbs"
                type="number"
                placeholder="0"
                value={formData.carbs}
                onChange={(e) => updateField("carbs", e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleSubmit} className="mt-2">
            {t("addButton")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
