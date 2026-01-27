"use client";

import {
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/primitives/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/primitives/pagination";
import type { DataTablePaginationProps } from "../types";

export function DataTablePagination({
  table,
  pageSizeOptions = [10, 20, 30, 50],
  showPageInfo = true,
}: DataTablePaginationProps) {
  return (
    <div className="flex flex-col gap-3 px-2 md:flex-row md:items-center md:justify-between">
      {showPageInfo && (
        <div className="text-sm text-muted-foreground text-center md:text-left">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
      )}

      <div className="flex items-center justify-between gap-4 md:justify-end md:gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <p className="hidden text-sm font-medium sm:block">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                size="icon"
                onClick={() => table.firstPage()}
                aria-disabled={!table.getCanPreviousPage()}
                className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : "cursor-pointer"}
              >
                <ChevronsLeft className="size-4" />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => table.previousPage()}
                aria-disabled={!table.getCanPreviousPage()}
                className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                aria-disabled={!table.getCanNextPage()}
                className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                size="icon"
                onClick={() => table.lastPage()}
                aria-disabled={!table.getCanNextPage()}
                className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : "cursor-pointer"}
              >
                <ChevronsRight className="size-4" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
