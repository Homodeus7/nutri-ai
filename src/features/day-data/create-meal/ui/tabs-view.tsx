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
import { AiInputTab } from "./ai-input-tab";
import type { ProductSelectionHandlers } from "../model/types";
import { useI18n } from "../i18n";
import type { AiParseErrorCode } from "@/features/ai-parse";

interface TabsViewProps {
  onAddProducts: () => void;
  onSwitchToCreate: ProductSelectionHandlers["onSwitchToCreate"];
  searchTabLabel: string;
  isPending: boolean;
  aiParseText: (text: string) => void;
  isAiPending: boolean;
  aiErrorCode: AiParseErrorCode | null;
  onClearAiError: () => void;
}

export function TabsView({
  onAddProducts,
  onSwitchToCreate,
  searchTabLabel,
  isPending,
  aiParseText,
  isAiPending,
  aiErrorCode,
  onClearAiError,
}: TabsViewProps) {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [aiText, setAiText] = useState("");

  return (
    <Tabs defaultValue="ai" className="w-full flex-1 min-h-0">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="ai" className="gap-1.5">
          <Sparkle className="size-4" />
          {t("aiTab")}
        </TabsTrigger>
        <TabsTrigger value="search">{searchTabLabel}</TabsTrigger>
      </TabsList>
      <TabsContent value="ai" className="flex-1 flex flex-col min-h-0">
        <AiInputTab
          text={aiText}
          onTextChange={setAiText}
          onSubmit={aiParseText}
          isPending={isAiPending}
          errorCode={aiErrorCode}
          onClearError={onClearAiError}
        />
      </TabsContent>
      <TabsContent value="search" className="flex-1 flex flex-col min-h-0">
        <SearchProductsTab
          onAddProducts={onAddProducts}
          onShowCreateForm={() => onSwitchToCreate(searchQuery)}
          isPending={isPending}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />
      </TabsContent>
    </Tabs>
  );
}
