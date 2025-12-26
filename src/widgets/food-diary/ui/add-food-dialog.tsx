import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/primitives/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui/primitives/tabs";
import type { ProductItemData } from "@/features/product/create-product";
import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";
import type { AddFoodFormData } from "../model/types";
import { useI18n } from "../i18n";
import { SearchProductsTab } from "./search-products-tab";
import { RecentProductsTab } from "./recent-products-tab";

interface AddFoodDialogProps {
  mealName: string;
  onAddFood: (formData: AddFoodFormData) => void;
}

export function AddFoodDialog({ mealName, onAddFood }: AddFoodDialogProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleProductsSelect = (products: Product[]) => {
    // TODO: Open quantity selection dialog
    // For now, add 100g by default for each product
    products.forEach((product) => {
      const formData: AddFoodFormData = {
        name: product.name,
        calories: String(product.kcalPer100g),
        protein: String(product.proteinPer100g || 0),
        fat: String(product.fatPer100g || 0),
        carbs: String(product.carbsPer100g || 0),
      };
      onAddFood(formData);
    });
    setIsOpen(false);
  };

  const handleCreateProduct = (productItemData: ProductItemData) => {
    const formData: AddFoodFormData = {
      name: productItemData.name,
      calories: String(productItemData.calories),
      protein: String(productItemData.protein),
      fat: String(productItemData.fat),
      carbs: String(productItemData.carbs),
    };

    onAddFood(formData);
    setIsOpen(false);
    setShowCreateForm(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
          <Plus className="size-6 text-chart-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto flex flex-col items-satrt lg:min-h-[400px]">
        <DialogHeader>
          <DialogTitle>
            {showCreateForm
              ? "Создать продукт"
              : `${t("addFoodTo")} ${mealName.toLowerCase()}`}
          </DialogTitle>
        </DialogHeader>
        {!showCreateForm && (
          <Tabs defaultValue="search" className="py-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="search">Еда</TabsTrigger>
              <TabsTrigger value="recent">Недавние</TabsTrigger>
            </TabsList>
            <TabsContent value="search">
              <SearchProductsTab
                onSelectProducts={handleProductsSelect}
                onCreateProduct={handleCreateProduct}
                onShowCreateFormChange={setShowCreateForm}
              />
            </TabsContent>
            <TabsContent value="recent">
              <RecentProductsTab />
            </TabsContent>
          </Tabs>
        )}
        {showCreateForm && (
          <div className="py-4">
            <SearchProductsTab
              onSelectProducts={handleProductsSelect}
              onCreateProduct={handleCreateProduct}
              onShowCreateFormChange={setShowCreateForm}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
