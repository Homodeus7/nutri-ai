"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import { UiText } from "@/shared/ui/ui-text";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/primitives/card";
import { useProductDetail } from "./model/use-product-detail";
import { ProductNutritionTable } from "./ui/product-nutrition-table";
import { useI18n } from "./i18n";

export function ProductDetailPage() {
  const { t } = useI18n();
  const { product, isLoading, goBack } = useProductDetail();

  if (isLoading) {
    return <UiPageSpinner />;
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <UiText variant="muted">{t("notFound")}</UiText>
        <Button variant="ghost" onClick={goBack} className="mt-4">
          <ArrowLeft className="mr-2 size-4" />
          {t("backToList")}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={goBack}>
        <ArrowLeft className="mr-2 size-4" />
        {t("backToList")}
      </Button>

      <div>
        <UiText variant="h1" weight="bold">
          {product.name}
        </UiText>
        {product.brand && <UiText variant="muted">{product.brand}</UiText>}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("nutritionPer100g")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductNutritionTable
              product={product}
              labels={{
                kcal: t("kcal"),
                protein: t("protein"),
                fat: t("fat"),
                carbs: t("carbs"),
                fiber: t("fiber"),
                sugar: t("sugar"),
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("details")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("source")}</span>
              <span className="capitalize">{product.source ?? "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("category")}</span>
              <span>{product.category ?? "-"}</span>
            </div>
            {product.brand && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("brand")}</span>
                <span>{product.brand}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("verified")}</span>
              <span>{product.isVerified ? t("yes") : t("no")}</span>
            </div>
            {product.barcode && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("barcode")}</span>
                <span className="font-mono">{product.barcode}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
