"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/shared/ui/primitives/input";
import { Button } from "@/shared/ui/primitives/button";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: SearchInputProps) {
  return (
    <div className={className ?? "relative"}>
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 size-6 -translate-y-1/2"
          onClick={() => onChange("")}
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}
