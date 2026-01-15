"use client";

import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/primitives/form";
import { Input } from "@/shared/ui/primitives/input";
import { Button } from "@/shared/ui/primitives/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/primitives/select";
import { useUpdateGoals, useGoals } from "../model/use-update-goals";
import {
  MACRO_PRESETS,
  DEFAULT_PRESET,
  DEFAULT_DAILY_KCAL,
  calculateGrams,
} from "../model/presets";
import { useI18n } from "../i18n";
import { cn } from "@/shared/lib/css";

export function UpdateGoalsForm() {
  const { t } = useI18n();
  const { data: currentGoals, isLoading } = useGoals();

  // Zod schema with i18n translations and sum validation
  const goalsSchema = useMemo(
    () =>
      z
        .object({
          dailyKcalGoal: z.coerce
            .number({ invalid_type_error: t("kcalRequired") })
            .int()
            .min(1000, t("kcalMin"))
            .max(10000, t("kcalMax")),
          proteinPct: z.coerce
            .number({ invalid_type_error: t("percentRequired") })
            .int()
            .min(5, t("percentMin"))
            .max(80, t("percentMax")),
          fatPct: z.coerce
            .number({ invalid_type_error: t("percentRequired") })
            .int()
            .min(5, t("percentMin"))
            .max(80, t("percentMax")),
          carbsPct: z.coerce
            .number({ invalid_type_error: t("percentRequired") })
            .int()
            .min(5, t("percentMin"))
            .max(80, t("percentMax")),
        })
        .refine((data) => data.proteinPct + data.fatPct + data.carbsPct === 100, {
          message: t("sumError"),
          path: ["carbsPct"], // Show error on the last field
        }),
    [t]
  );

  type GoalsFormData = z.infer<typeof goalsSchema>;

  const form = useForm<GoalsFormData>({
    resolver: zodResolver(goalsSchema),
    defaultValues: {
      dailyKcalGoal: DEFAULT_DAILY_KCAL,
      proteinPct: DEFAULT_PRESET.proteinPct,
      fatPct: DEFAULT_PRESET.fatPct,
      carbsPct: DEFAULT_PRESET.carbsPct,
    },
  });

  // Update form when goals are loaded
  useEffect(() => {
    if (currentGoals) {
      form.reset({
        dailyKcalGoal: currentGoals.dailyKcalGoal ?? DEFAULT_DAILY_KCAL,
        proteinPct: currentGoals.proteinPct ?? DEFAULT_PRESET.proteinPct,
        fatPct: currentGoals.fatPct ?? DEFAULT_PRESET.fatPct,
        carbsPct: currentGoals.carbsPct ?? DEFAULT_PRESET.carbsPct,
      });
    }
  }, [currentGoals, form]);

  // Watch values for live calculation
  const watchedValues = useWatch({ control: form.control });
  const dailyKcal = watchedValues.dailyKcalGoal || DEFAULT_DAILY_KCAL;
  const proteinPct = watchedValues.proteinPct || 0;
  const fatPct = watchedValues.fatPct || 0;
  const carbsPct = watchedValues.carbsPct || 0;

  const calculatedGrams = calculateGrams(dailyKcal, proteinPct, fatPct, carbsPct);
  const percentSum = proteinPct + fatPct + carbsPct;
  const isSumValid = percentSum === 100;

  // Determine current preset
  const currentPreset = useMemo(() => {
    return (
      MACRO_PRESETS.find(
        (p) =>
          p.proteinPct === proteinPct &&
          p.fatPct === fatPct &&
          p.carbsPct === carbsPct
      )?.key || "custom"
    );
  }, [proteinPct, fatPct, carbsPct]);

  const handlePresetChange = (presetKey: string) => {
    if (presetKey === "custom") return;
    const preset = MACRO_PRESETS.find((p) => p.key === presetKey);
    if (preset) {
      form.setValue("proteinPct", preset.proteinPct, { shouldValidate: true });
      form.setValue("fatPct", preset.fatPct, { shouldValidate: true });
      form.setValue("carbsPct", preset.carbsPct, { shouldValidate: true });
    }
  };

  const { updateGoals, isPending } = useUpdateGoals({
    onSuccess: () => {
      toast.success(t("successMessage"));
    },
    onError: (error) => {
      toast.error(error.message || t("errorMessage"));
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    updateGoals(data);
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">{t("loadingMessage")}</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Daily Calories */}
        <FormField
          control={form.control}
          name="dailyKcalGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("dailyKcalLabel")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="2000"
                  min="1000"
                  max="10000"
                  step="50"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Preset Selector */}
        <div className="space-y-2">
          <FormLabel>{t("presetLabel")}</FormLabel>
          <Select value={currentPreset} onValueChange={handlePresetChange}>
            <SelectTrigger>
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
        </div>

        {/* Macro Percentages */}
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="proteinPct"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("proteinLabel")} (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="30"
                    min="5"
                    max="80"
                    step="5"
                    {...field}
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  {calculatedGrams.proteinGrams} {t("gramsLabel")}
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fatPct"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fatLabel")} (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="30"
                    min="5"
                    max="80"
                    step="5"
                    {...field}
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  {calculatedGrams.fatGrams} {t("gramsLabel")}
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="carbsPct"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("carbsLabel")} (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="40"
                    min="5"
                    max="80"
                    step="5"
                    {...field}
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  {calculatedGrams.carbsGrams} {t("gramsLabel")}
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Sum Indicator */}
        <div
          className={cn(
            "text-sm font-medium p-3 rounded-md",
            isSumValid
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-destructive/10 text-destructive"
          )}
        >
          {t("sumLabel")}: {percentSum}%
          {!isSumValid && ` — ${t("sumError")}`}
        </div>

        <Button type="submit" className="w-full" disabled={isPending || !isSumValid}>
          {t("submitButton")}
        </Button>
      </form>
    </Form>
  );
}
