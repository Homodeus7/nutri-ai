import type {
  ColumnDef,
  PaginationState,
  SortingState,
  OnChangeFn,
  Table as TanStackTable,
  Column,
} from "@tanstack/react-table";

export interface TablePaginationState {
  pageIndex: number;
  pageSize: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];

  pagination: TablePaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  pageCount: number;
  totalRows?: number;

  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;

  isLoading?: boolean;

  onRowClick?: (row: TData) => void;

  emptyState?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DataTablePaginationProps {
  table: TanStackTable<any>;
  pageSizeOptions?: number[];
  showPageInfo?: boolean;
}

export interface SortableHeaderProps<TData> {
  column: Column<TData, unknown>;
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface UseDataTableConfig<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  pagination: TablePaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  pageCount: number;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
}
