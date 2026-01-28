"use client";

import { UiText } from "@/shared/ui/ui-text";
import { UiButton } from "@/shared/ui/ui-button";
import {
  UpdateGoalsForm,
  GOALS_FORM_ID,
  GoalsFormProvider,
  useGoalsFormContext,
} from "@/features/goals";
import { MacrosPieChart } from "@/widgets/macros-pie-chart";
import { useI18n } from "./i18n";

export function GoalsPage() {
  return (
    <GoalsFormProvider>
      <GoalsPageContent />
    </GoalsFormProvider>
  );
}

function GoalsPageContent() {
  const { t } = useI18n();
  const { isLoading, isPending, isSumValid, calculatedGrams } =
    useGoalsFormContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">{t("loading")}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <UiText variant="h1" weight="bold">
            {t("title")}
          </UiText>
          <UiText variant="muted" className="pt-2">
            {t("description")}
          </UiText>
        </div>
        <UiButton
          type="submit"
          form={GOALS_FORM_ID}
          loading={isPending}
          disabled={!isSumValid}
        >
          {t("save")}
        </UiButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        <div className="lg:col-span-7">
          <UpdateGoalsForm />
        </div>
        <div className="lg:col-span-5">
          <MacrosPieChart
            protein={calculatedGrams.proteinGrams}
            fat={calculatedGrams.fatGrams}
            carbs={calculatedGrams.carbsGrams}
            variant="bottom"
          />
        </div>
      </div>
    </>
  );
}
