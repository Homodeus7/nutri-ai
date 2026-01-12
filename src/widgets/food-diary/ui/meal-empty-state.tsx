import { Salad } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/ui/primitives/empty";
import { CreateMealDialog } from "@/features/day-data";
import { useI18n } from "../i18n";
import { useMealCardContext } from "../model/meal-card-context";

export function MealEmptyState() {
  const { t } = useI18n();
  const { date, mealType, mealName } = useMealCardContext();

  return (
    <Empty className="border-none py-8">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Salad className="size-5" />
        </EmptyMedia>
        <EmptyTitle>{t("noEntries")}</EmptyTitle>
        <EmptyDescription>{t("clickToAdd")}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <CreateMealDialog date={date} mealType={mealType} mealName={mealName} />
      </EmptyContent>
    </Empty>
  );
}
