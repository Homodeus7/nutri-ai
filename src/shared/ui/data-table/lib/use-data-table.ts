import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import type { UseDataTableConfig } from "../types";

export function useDataTable<TData>({
  data,
  columns,
  pagination,
  onPaginationChange,
  pageCount,
  sorting = [],
  onSortingChange,
}: UseDataTableConfig<TData>) {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
      sorting,
    },
    onPaginationChange,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  return table;
}
