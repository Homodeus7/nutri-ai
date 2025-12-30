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

interface TabsViewProps {
  onAddProducts: () => void;
  onSwitchToCreate: ProductSelectionHandlers["onSwitchToCreate"];
  searchTabLabel: string;
  recentTabLabel: string;
  isPending: boolean;
}

export function TabsView({
  onAddProducts,
  onSwitchToCreate,
  searchTabLabel,
  recentTabLabel,
  isPending,
}: TabsViewProps) {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");

  const handleAiSubmit = (text: string) => {
    // AI parsing logic will be implemented later
    console.log("AI input:", text);
  };

  return (
    <Tabs defaultValue="ai" className="w-full flex flex-col h-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="ai" className="gap-1.5">
          <Sparkle className="size-4" />
          {t("aiTab")}
        </TabsTrigger>
        <TabsTrigger value="search">{searchTabLabel}</TabsTrigger>
        <TabsTrigger value="recent">{recentTabLabel}</TabsTrigger>
      </TabsList>
      <TabsContent value="ai" className="flex-1 flex flex-col min-h-0">
        <AiInputTab onSubmit={handleAiSubmit} isPending={isPending} />
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
