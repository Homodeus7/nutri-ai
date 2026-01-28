"use client";

import type { LucideIcon } from "lucide-react";
import type { Control, FieldPath } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
} from "@/shared/ui/primitives/form";
import { Slider } from "@/shared/ui/primitives/slider";

interface MacroSliderFieldProps {
  control: Control<any>;
  name: FieldPath<any>;
  label: string;
  grams: number;
  gramsLabel: string;
  icon: LucideIcon;
}

export function MacroSliderField({
  control,
  name,
  label,
  grams,
  gramsLabel,
  icon: Icon,
}: MacroSliderFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between items-end mb-3">
            <div className="flex items-center gap-2">
              <Icon size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium">{label}</span>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold">{field.value}%</span>
              <span className="text-xs text-muted-foreground ml-2">
                ({grams}
                {gramsLabel})
              </span>
            </div>
          </div>
          <FormControl>
            <Slider
              min={5}
              max={80}
              step={5}
              value={[field.value]}
              onValueChange={([val]) => {
                field.onChange(val);
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
