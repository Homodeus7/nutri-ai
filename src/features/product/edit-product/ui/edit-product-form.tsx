"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { DialogFooter } from "@/shared/ui/primitives/dialog";
import { useI18n } from "../i18n";
import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";

export interface EditProductFormProps {
  product: Product;
  isPending: boolean;
  onSubmit: (data: EditProductFormData) => void;
  onCancel: () => void;
}

export interface EditProductFormData {
  name: string;
  kcalPer100g: number;
  proteinPer100g?: number | "";
  fatPer100g?: number | "";
  carbsPer100g?: number | "";
  fiberPer100g?: number | "";
  sugarPer100g?: number | "";
  barcode?: string;
  brand?: string;
  category?: string;
}

export function EditProductForm({
  product,
  isPending,
  onSubmit,
  onCancel,
}: EditProductFormProps) {
  const { t } = useI18n();

  const editProductSchema = z.object({
    name: z.string().min(1, t("nameRequired")),
    kcalPer100g: z.coerce
      .number({ invalid_type_error: t("kcalInvalid") })
      .int(t("kcalMustBeInteger"))
      .min(0, t("kcalMustBePositive")),
    proteinPer100g: z.coerce
      .number({ invalid_type_error: t("proteinInvalid") })
      .min(0, t("proteinMustBePositive"))
      .optional()
      .or(z.literal("")),
    fatPer100g: z.coerce
      .number({ invalid_type_error: t("fatInvalid") })
      .min(0, t("fatMustBePositive"))
      .optional()
      .or(z.literal("")),
    carbsPer100g: z.coerce
      .number({ invalid_type_error: t("carbsInvalid") })
      .min(0, t("carbsMustBePositive"))
      .optional()
      .or(z.literal("")),
    fiberPer100g: z.coerce
      .number({ invalid_type_error: t("fiberInvalid") })
      .min(0, t("fiberMustBePositive"))
      .optional()
      .or(z.literal("")),
    sugarPer100g: z.coerce
      .number({ invalid_type_error: t("sugarInvalid") })
      .min(0, t("sugarMustBePositive"))
      .optional()
      .or(z.literal("")),
    barcode: z.string().optional(),
    brand: z.string().optional(),
    category: z.string().optional(),
  });

  const form = useForm<EditProductFormData>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: product.name,
      kcalPer100g: product.kcalPer100g,
      proteinPer100g: product.proteinPer100g ?? "",
      fatPer100g: product.fatPer100g ?? "",
      carbsPer100g: product.carbsPer100g ?? "",
      fiberPer100g: product.fiberPer100g ?? "",
      sugarPer100g: product.sugarPer100g ?? "",
      barcode: product.barcode ?? "",
      brand: product.brand ?? "",
      category: product.category ?? "",
    },
  });

  const handleSubmit = form.handleSubmit(onSubmit);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("nameLabel")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("namePlaceholder")}
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="kcalPer100g"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("kcalLabel")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  min="0"
                  step="1"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="proteinPer100g"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("proteinLabel")}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    min="0"
                    step="0.1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fatPer100g"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fatLabel")}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    min="0"
                    step="0.1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="carbsPer100g"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("carbsLabel")}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    min="0"
                    step="0.1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fiberPer100g"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fiberLabel")}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    min="0"
                    step="0.1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sugarPer100g"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("sugarLabel")}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    min="0"
                    step="0.1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="barcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("barcodeLabel")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("barcodePlaceholder")}
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("brandLabel")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("brandPlaceholder")}
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("categoryLabel")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("categoryPlaceholder")}
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
          >
            {t("cancelButton")}
          </Button>
          <Button type="submit" disabled={isPending}>
            {t("saveButton")}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
