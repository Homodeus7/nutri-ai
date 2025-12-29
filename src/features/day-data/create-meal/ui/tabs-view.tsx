"use client";

import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui/primitives/tabs";
import { SearchProductsTab } from "./search-products-tab";
import { RecentProductsTab } from "./recent-products-tab";
import type { ProductSelectionHandlers } from "../model/types";

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
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Tabs defaultValue="search" className="w-full flex flex-col h-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="search">{searchTabLabel}</TabsTrigger>
        <TabsTrigger value="recent">{recentTabLabel}</TabsTrigger>
      </TabsList>
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
