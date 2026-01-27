"use client";

import { useState } from "react";
import { Sparkle } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui/primitives/tabs";
import { SearchProductsTab } from "./search-products-tab";
import { RecentProductsTab } from "./recent-products-tab";
import { AiInputTab } from "./ai-input-tab";
import type { ProductSelectionHandlers } from "../model/types";
import { useI18n } from "../i18n";
import { useAiParse } from "@/features/ai-parse";
import type { AiParseRequestMealType } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";

interface TabsViewProps {
  date: string;
  mealType: AiParseRequestMealType;
  onAddProducts: () => void;
  onSwitchToCreate: ProductSelectionHandlers["onSwitchToCreate"];
  searchTabLabel: string;
  recentTabLabel: string;
  isPending: boolean;
  onClose?: () => void;
}

export function TabsView({
  date,
  mealType,
  onAddProducts,
  onSwitchToCreate,
  searchTabLabel,
  recentTabLabel,
  isPending,
  onClose,
}: TabsViewProps) {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    parseText,
    isPending: isAiPending,
    errorCode: aiErrorCode,
    clearError: clearAiError,
  } = useAiParse({
    date,
    mealType,
    onSuccess: () => {
      onClose?.();
    },
  });

  return (
    <Tabs defaultValue="ai" className="w-full flex-1 min-h-0">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="ai" className="gap-1.5">
          <Sparkle className="size-4" />
          {t("aiTab")}
        </TabsTrigger>
        <TabsTrigger value="search">{searchTabLabel}</TabsTrigger>
        <TabsTrigger value="recent">{recentTabLabel}</TabsTrigger>
      </TabsList>
      <TabsContent value="ai" className="flex-1 flex flex-col min-h-0">
        <AiInputTab
          onSubmit={parseText}
          isPending={isAiPending}
          errorCode={aiErrorCode}
          onClearError={clearAiError}
        />
      </TabsContent>
      <TabsContent value="search" className="flex-1 flex flex-col min-h-0">
        <SearchProductsTab
          onAddProducts={onAddProducts}
          onShowCreateForm={onSwitchToCreate}
          isPending={isPending}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />
      </TabsContent>
      <TabsContent value="recent" className="flex-1 flex flex-col min-h-0">
        <RecentProductsTab />
      </TabsContent>
    </Tabs>
  );
}
