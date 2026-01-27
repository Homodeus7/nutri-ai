import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import type { UseDataTableConfig } from "../types";

const DEFAULT_PAGINATION = { pageIndex: 0, pageSize: 9999 };

export function useDataTable<TData>({
  data,
  columns,
  pagination,
  onPaginationChange,
  pageCount,
  sorting = [],
  onSortingChange,
  meta,
}: UseDataTableConfig<TData>) {
  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? Math.ceil(data.length / (pagination?.pageSize ?? 9999)),
    state: {
      pagination: pagination
        ? { pageIndex: pagination.pageIndex, pageSize: pagination.pageSize }
        : DEFAULT_PAGINATION,
      sorting,
    },
    onPaginationChange,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    meta,
  });

  return table;
}
