"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/shared/ui/primitives/input";

interface SearchInputProps {
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export function SearchInput({
  onSearchChange,
  placeholder = "Поиск продуктов...",
}: SearchInputProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearchChange(newValue);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="pl-9"
      />
    </div>
  );
}
