"use client";

export function DataTableToolbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between md:gap-4">
      {children}
    </div>
  );
}
