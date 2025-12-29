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
import { Button } from "@/shared/ui/primitives/button";
import { Input } from "@/shared/ui/primitives/input";
import { DialogFooter } from "@/shared/ui/primitives/dialog";
import { useI18n } from "../i18n";

export interface UpdateMealProductFormProps {
  productName: string;
  currentQuantity: number;
  isPending: boolean;
  onSubmit: (quantity: number) => void;
  onCancel: () => void;
}

export function UpdateMealProductForm({
  productName,
  currentQuantity,
  isPending,
  onSubmit,
  onCancel,
}: UpdateMealProductFormProps) {
  const { t } = useI18n();

  const updateMealProductSchema = z.object({
    productName: z.string(),
    quantity: z.coerce
      .number({ invalid_type_error: t("quantityInvalid") })
      .positive(t("quantityMustBePositive")),
  });

  type UpdateMealProductFormData = z.infer<typeof updateMealProductSchema>;

  const form = useForm<UpdateMealProductFormData>({
    resolver: zodResolver(updateMealProductSchema),
    defaultValues: {
      productName,
      quantity: currentQuantity,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    if (data.quantity !== currentQuantity) {
      onSubmit(data.quantity);
    } else {
      onCancel();
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("productLabel")}</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("quantity")}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="1"
                    autoFocus
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
          >
            {t("cancel")}
          </Button>
          <Button type="submit" disabled={isPending}>
            {t("save")}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
