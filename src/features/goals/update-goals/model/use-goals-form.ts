"use client";

import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useUpdateGoals, useGoals } from "./use-update-goals";
import {
  MACRO_PRESETS,
  DEFAULT_PRESET,
  DEFAULT_DAILY_KCAL,
  calculateGrams,
} from "./presets";
import { useI18n } from "../i18n";

export function useGoalsForm() {
  const { t } = useI18n();
  const { data: currentGoals, isLoading } = useGoals();

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
          path: ["carbsPct"],
        }),
    [t],
  );

  const form = useForm<z.infer<typeof goalsSchema>>({
    resolver: zodResolver(goalsSchema),
    defaultValues: {
      dailyKcalGoal: DEFAULT_DAILY_KCAL,
      proteinPct: DEFAULT_PRESET.proteinPct,
      fatPct: DEFAULT_PRESET.fatPct,
      carbsPct: DEFAULT_PRESET.carbsPct,
    },
  });

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

  const watchedValues = useWatch({ control: form.control });
  const dailyKcal = watchedValues.dailyKcalGoal || DEFAULT_DAILY_KCAL;
  const proteinPct = watchedValues.proteinPct || 0;
  const fatPct = watchedValues.fatPct || 0;
  const carbsPct = watchedValues.carbsPct || 0;

  const calculatedGrams = calculateGrams(dailyKcal, proteinPct, fatPct, carbsPct);
  const percentSum = proteinPct + fatPct + carbsPct;
  const isSumValid = percentSum === 100;

  const currentPreset = useMemo(() => {
    return (
      MACRO_PRESETS.find(
        (p) =>
          p.proteinPct === proteinPct &&
          p.fatPct === fatPct &&
          p.carbsPct === carbsPct,
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

  return {
    form,
    isLoading,
    isPending,
    isSumValid,
    dailyKcal,
    proteinPct,
    fatPct,
    carbsPct,
    calculatedGrams,
    percentSum,
    currentPreset,
    handlePresetChange,
    onSubmit,
  };
}

export type GoalsFormReturn = ReturnType<typeof useGoalsForm>;
