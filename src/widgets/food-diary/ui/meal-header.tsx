import { CreateMealDialog } from "@/features/day-data";
import { UiText } from "@/shared/ui/ui-text";
import { useMealCardContext } from "../model/meal-card-context";

interface MealHeaderProps {
  name: string;
  icon: React.ElementType;
  color: string;
}

export function MealHeader({ name, icon: Icon, color }: MealHeaderProps) {
  const { date, mealType } = useMealCardContext();

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
        <CreateMealDialog date={date} mealType={mealType} mealName={name} />
      </div>
    </>
  );
}
