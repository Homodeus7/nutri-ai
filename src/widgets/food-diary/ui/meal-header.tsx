import { CreateMealDialog } from "@/features/day-data";
import { UiText } from "@/shared/ui/ui-text";
import { useIsMobile } from "@/shared/lib/use-media-query";
import { useMealCardContext } from "../model/meal-card-context";
import { useI18n } from "../i18n";

interface MealHeaderProps {
  name: string;
  icon: React.ElementType;
  color: string;
  isEmpty?: boolean;
  calories?: number;
}

export function MealHeader({
  name,
  icon: Icon,
  color,
  isEmpty = false,
  calories,
}: MealHeaderProps) {
  const { date, mealType } = useMealCardContext();
  const { t } = useI18n();
  const isMobile = useIsMobile();

  const formatCalories = (cal: number) => Math.round(cal);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg bg-background/50 ${color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <UiText variant="large" as="span" weight="semibold">
            {name}
          </UiText>
        </div>
        <div className="flex items-center gap-1">
          {!isEmpty && calories !== undefined && (
            <div className="flex flex-col items-end">
              <UiText variant="small" weight="semibold">
                {formatCalories(calories)}
              </UiText>
              <UiText variant="small" className="text-[10px]">
                {t("kcal")}
              </UiText>
            </div>
          )}
          {(isMobile || !isEmpty) && (
            <CreateMealDialog date={date} mealType={mealType} mealName={name} />
          )}
        </div>
      </div>
    </>
  );
}
