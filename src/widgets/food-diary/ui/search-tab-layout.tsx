import type { ReactNode } from "react";
import { Button } from "@/shared/ui/primitives/button";

interface SearchTabLayoutProps {
  searchInput?: ReactNode;
  content: ReactNode;
  emptyState?: ReactNode;
  loadingState?: ReactNode;
  createForm?: ReactNode;
  showCreateForm?: boolean;
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
  createForm,
  showCreateForm = false,
  onBackToSearch,
  isLoading = false,
  isEmpty = false,
  hasContent = false,
}: SearchTabLayoutProps) {
  // Показываем форму создания
  if (showCreateForm && createForm) {
    return (
      <div className="space-y-4">
        {onBackToSearch && (
          <Button variant="ghost" size="sm" onClick={onBackToSearch}>
            ← Назад к поиску
          </Button>
        )}
        {createForm}
      </div>
    );
  }

  // Основной layout с поиском
  return (
    <div className="space-y-4">
      {searchInput}

      {isLoading && loadingState}

      {!isLoading && hasContent && content}

      {isEmpty && emptyState}

      {!isLoading && !hasContent && !isEmpty && (
        <div className="text-center text-sm text-muted-foreground py-8">
          Начните вводить название продукта
        </div>
      )}
    </div>
  );
}
