import type { ReactNode } from "react";
import { useI18n } from "../i18n";

interface SearchTabLayoutProps {
  searchInput?: ReactNode;
  content: ReactNode;
  emptyState?: ReactNode;
  loadingState?: ReactNode;
  onBackToSearch?: () => void;
  isLoading?: boolean;
  isEmpty?: boolean;
  hasContent?: boolean;
}

export function SearchTabLayout({
  searchInput,
  content,
  emptyState,
  loadingState,
  isLoading = false,
  isEmpty = false,
  hasContent = false,
}: SearchTabLayoutProps) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col flex-1 min-h-0 gap-2 md:gap-4">
      {searchInput}

      {isLoading && loadingState}

      {!isLoading && hasContent && (
        <div className="flex-1 flex flex-col min-h-0">{content}</div>
      )}

      {isEmpty && emptyState}

      {!isLoading && !hasContent && !isEmpty && (
        <div className="text-center text-sm text-muted-foreground py-8">
          {t("startTyping")}
        </div>
      )}
    </div>
  );
}
