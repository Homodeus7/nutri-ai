"use client";

import { useForm } from "react-hook-form";
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
import { useCreateProduct } from "../model/use-create-product";
import { useI18n } from "../i18n";

export interface ProductItemData {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface CreateProductFormProps {
  onSuccess?: (productItemData: ProductItemData) => void;
}

export function CreateProductForm({ onSuccess }: CreateProductFormProps) {
  const { t } = useI18n();

  // Zod schema with i18n translations
  const createProductSchema = z.object({
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
    quantity: z.coerce
      .number({ invalid_type_error: t("quantityInvalid") })
      .min(1, t("quantityMustBePositive")),
  });

  type CreateProductFormData = z.infer<typeof createProductSchema>;

  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      kcalPer100g: 0,
      proteinPer100g: "",
      fatPer100g: "",
      carbsPer100g: "",
      fiberPer100g: "",
      sugarPer100g: "",
      barcode: "",
      brand: "",
      category: "",
      quantity: 100,
    },
  });

  const { createProduct, isPending } = useCreateProduct({
    onSuccess: (product) => {
      const currentFormData = form.getValues();
      const quantity = currentFormData.quantity;

      // Calculate nutrition for the specified quantity
      const multiplier = quantity / 100;
      const productItemData: ProductItemData = {
        name: product.name,
        calories: Math.round(product.kcalPer100g * multiplier),
        protein: Math.round((product.proteinPer100g || 0) * multiplier * 10) / 10,
        fat: Math.round((product.fatPer100g || 0) * multiplier * 10) / 10,
        carbs: Math.round((product.carbsPer100g || 0) * multiplier * 10) / 10,
      };

      toast.success(t("successMessage"));
      form.reset();
      onSuccess?.(productItemData);
    },
    onError: (error) => {
      toast.error(error.message || t("errorMessage"));
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    // Filter out empty optional fields (excluding quantity which is for calculation only)
    const payload = {
      name: data.name,
      kcalPer100g: data.kcalPer100g,
      ...(data.proteinPer100g && {
        proteinPer100g: Number(data.proteinPer100g),
      }),
      ...(data.fatPer100g && { fatPer100g: Number(data.fatPer100g) }),
      ...(data.carbsPer100g && { carbsPer100g: Number(data.carbsPer100g) }),
      ...(data.fiberPer100g && { fiberPer100g: Number(data.fiberPer100g) }),
      ...(data.sugarPer100g && { sugarPer100g: Number(data.sugarPer100g) }),
      ...(data.barcode && { barcode: data.barcode }),
      ...(data.brand && { brand: data.brand }),
      ...(data.category && { category: data.category }),
      source: "manual" as const,
    };

    createProduct(payload);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Product Name */}
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

        {/* Quantity (grams to add) */}
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("quantityLabel")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t("quantityPlaceholder")}
                  min="1"
                  step="1"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Calories (required) */}
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

        {/* Macronutrients (optional) */}
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

        {/* Additional nutrients (optional) */}
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

        {/* Product metadata (optional) */}
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

        <Button type="submit" className="w-full" disabled={isPending}>
          {t("submitButton")}
        </Button>
      </form>
    </Form>
  );
}
