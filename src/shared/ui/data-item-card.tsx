import { cn } from "@/shared/lib/css";
import { Card, CardContent } from "@/shared/ui/primitives/card";

export interface DataItemCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  color?: string;
  className?: string;
}

export function DataItemCard({
  label,
  value,
  subtitle,
  color,
  className,
}: DataItemCardProps) {
  return (
    <Card className={cn("bg-muted/50 text-center shadow-none", className)}>
      <CardContent className="">
        {color && (
          <div
            className="w-2 h-2 rounded-full mx-auto mb-2"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
        )}
        <div className="text-xs text-muted-foreground tracking-wide mb-1">
          {label}
        </div>
        <div className="font-bold text-lg">{value}</div>
        {subtitle && (
          <div className="text-[10px] font-mono text-muted-foreground">
            {subtitle}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
