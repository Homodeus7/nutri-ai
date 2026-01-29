"use client";

import { flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/primitives/table";
import { Spinner } from "@/shared/ui/primitives/spinner";
import { useDataTable } from "../lib/use-data-table";
import { DataTablePagination } from "./data-table-pagination";
import type { DataTableProps } from "../types";
import { cn } from "@/shared/lib/css";

export function DataTable<TData>({
  data,
  columns,
  pagination,
  onPaginationChange,
  pageCount,
  sorting,
  onSortingChange,
  isLoading,
  onRowClick,
  emptyState,
  footer,
  className,
  meta,
}: DataTableProps<TData>) {
  const table = useDataTable({
    data,
    columns,
    pagination,
    onPaginationChange,
    pageCount,
    sorting,
    onSortingChange,
    meta,
  });

  if (!isLoading && data.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  const hasPagination = !!pagination;

  return (
    <div className={cn("min-w-0 space-y-2 md:space-y-4", className)}>
      <div className="overflow-auto rounded-md border [scrollbar-width:thin]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Spinner className="mx-auto" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row.original)}
                  className={cn(onRowClick && "cursor-pointer")}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {hasPagination && <DataTablePagination table={table} />}
      {footer}
    </div>
  );
}
