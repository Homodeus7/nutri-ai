"use client";

import { Dumbbell, Droplets, Wheat } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/primitives/form";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/primitives/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/primitives/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/shared/ui/primitives/input-group";
import { MACRO_PRESETS } from "../model/presets";
import { useGoalsFormContext } from "../model/goals-form-context";
import { useI18n } from "../i18n";
import { MacroSliderField } from "./macro-slider-field";
import { ValidationIndicator } from "./validation-indicator";

const FORM_ID = "goals-form";

export { FORM_ID as GOALS_FORM_ID };

export function UpdateGoalsForm() {
  const { t } = useI18n();
  const {
    form,
    calculatedGrams,
    percentSum,
    isSumValid,
    currentPreset,
    handlePresetChange,
    onSubmit,
  } = useGoalsFormContext();

  return (
    <Form {...form}>
      <form id={FORM_ID} onSubmit={onSubmit} className="space-y-6">
        {/* Calorie Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t("calorieTargetTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="dailyKcalGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("dailyKcalLabel")}</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupInput
                        type="number"
                        placeholder="2000"
                        min={1000}
                        max={10000}
                        step={50}
                        {...field}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupText>{t("kcalSuffix")}</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Macro Distribution Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t("macroRatioTitle")}</CardTitle>
            <CardAction>
              <Select value={currentPreset} onValueChange={handlePresetChange}>
                <SelectTrigger className="w-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MACRO_PRESETS.map((preset) => (
                    <SelectItem key={preset.key} value={preset.key}>
                      {t(preset.key as keyof ReturnType<typeof useI18n>["t"])}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">{t("custom")}</SelectItem>
                </SelectContent>
              </Select>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-6">
            <MacroSliderField
              control={form.control}
              name="proteinPct"
              label={t("proteinLabel")}
              grams={calculatedGrams.proteinGrams}
              gramsLabel={t("gramsLabel")}
              icon={Dumbbell}
            />
            <MacroSliderField
              control={form.control}
              name="fatPct"
              label={t("fatLabel")}
              grams={calculatedGrams.fatGrams}
              gramsLabel={t("gramsLabel")}
              icon={Droplets}
            />
            <MacroSliderField
              control={form.control}
              name="carbsPct"
              label={t("carbsLabel")}
              grams={calculatedGrams.carbsGrams}
              gramsLabel={t("gramsLabel")}
              icon={Wheat}
            />
            <ValidationIndicator
              sum={percentSum}
              isValid={isSumValid}
              validMessage={t("validationValid")}
              invalidMessage={t("validationInvalid").replace(
                "{sum}",
                String(percentSum),
              )}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
