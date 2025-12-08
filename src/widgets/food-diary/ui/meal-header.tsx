import { AddFoodDialog } from "./add-food-dialog";
import { UiText } from "@/shared/ui/ui-text";
import type { AddFoodFormData } from "../model/types";

interface MealHeaderProps {
  name: string;
  icon: React.ElementType;
  color: string;
  onAddFood: (formData: AddFoodFormData) => void;
}

export function MealHeader({
  name,
  icon: Icon,
  color,
  onAddFood,
}: MealHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-background/50 ${color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <UiText variant="large" as="span" weight="semibold">
            {name}
          </UiText>
        </div>
        <AddFoodDialog mealName={name} onAddFood={onAddFood} />
      </div>
    </>
  );
}
