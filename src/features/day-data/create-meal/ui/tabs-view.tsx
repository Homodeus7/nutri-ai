"use client";

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
  onProductsSelect: ProductSelectionHandlers["onProductsSelect"];
  onSwitchToCreate: ProductSelectionHandlers["onSwitchToCreate"];
  searchTabLabel: string;
  recentTabLabel: string;
}

export function TabsView({
  onProductsSelect,
  onSwitchToCreate,
  searchTabLabel,
  recentTabLabel,
}: TabsViewProps) {
  return (
    <Tabs defaultValue="search" className="py-4 w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="search">{searchTabLabel}</TabsTrigger>
        <TabsTrigger value="recent">{recentTabLabel}</TabsTrigger>
      </TabsList>
      <TabsContent value="search">
        <SearchProductsTab
          onSelectProducts={onProductsSelect}
          onShowCreateForm={onSwitchToCreate}
        />
      </TabsContent>
      <TabsContent value="recent">
        <RecentProductsTab />
      </TabsContent>
    </Tabs>
  );
}
