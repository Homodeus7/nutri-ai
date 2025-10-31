import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/shadcn-temp/select";
import { ReactNode, useId } from "react";
import clsx from "clsx";

type BaseOption = {
  id: string | number;
};

export type UiSelectProps<T extends BaseOption | undefined> = {
  className?: string;
  options?: T[];
  value?: T;
  onChange: (value: T) => void;
  label?: string;
  error?: string;
  getLabel: (value: T) => string;
  renderPreview?: (value?: T) => ReactNode;
  renderOption?: (
    value: T,
    o: { selected?: boolean; active?: boolean },
  ) => ReactNode;
  size?: "sm" | "default";
  placeholder?: string;
};

export function UiSelect<T extends BaseOption | undefined>({
  onChange,
  value,
  options,
  className,
  label,
  error,
  getLabel,
  renderPreview,
  renderOption = (o) => getLabel(o),
  size = "default",
  placeholder,
}: UiSelectProps<T>) {
  const id = useId();

  const handleChange = (selectedId: string) => {
    const option = options?.find((opt) => String(opt?.id) === selectedId);
    onChange((option ?? undefined) as T);
  };

  return (
    <div className={clsx(className, "flex flex-col gap-1")}>
      {label && (
        <label htmlFor={id} className="block">
          {label}
        </label>
      )}
      <Select
        value={value?.id ? String(value.id) : ""}
        onValueChange={handleChange}
      >
        <SelectTrigger id={id} size={size} className="w-fit">
          <SelectValue placeholder={placeholder}>
            {value && (renderPreview?.(value) ?? getLabel(value))}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => {
            const isSelected = option?.id === value?.id;
            return (
              <SelectItem
                key={option?.id ?? "empty"}
                value={String(option?.id)}
              >
                {renderOption(option, { selected: isSelected, active: false })}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {error && <div className="text-destructive text-sm">{error}</div>}
    </div>
  );
}
