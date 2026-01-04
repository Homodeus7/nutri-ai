"use client";

import { Card, CardContent } from "@/shared/ui/primitives/card";
import { UiText } from "@/shared/ui/ui-text";
import { cn } from "@/shared/lib/css";

interface MetricCardProps {
    label: string;
    value: number | string;
    total?: number | string;
    unit?: string;
    subtext?: string;
    icon?: React.ReactNode;
    className?: string;
    bgColor?: string;
    progressBar?: boolean;
}

export function MetricCard({
    label,
    value,
    total,
    unit = "",
    subtext,
    icon,
    className,
    bgColor = "bg-card",
    progressBar = false,
}: MetricCardProps) {
    // Safe calculation for percentage
    const currentVal = typeof value === "number" ? value : parseFloat(value as string) || 0;
    const totalVal = typeof total === "number" ? total : parseFloat(total as string) || 1;
    const percentage = Math.min(Math.max((currentVal / totalVal) * 100, 0), 100);

    return (
        <Card className={cn("border-0 transition-all hover:shadow-md", bgColor, className)}>
            <CardContent className="p-4 sm:p-5 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start mb-2">
                    <UiText variant="small" weight="semibold" className="text-black/70">
                        {label}
                    </UiText>
                    {icon && <span className="text-xl sm:text-2xl opacity-90">{icon}</span>}
                </div>

                {progressBar && total !== undefined ? (
                    <div className="space-y-3">
                        <div className="flex items-baseline gap-1">
                            <UiText variant="h3" weight="bold" className="text-black leading-none">
                                {value}
                            </UiText>
                            <UiText variant="small" weight="medium" className="text-black/60">
                                {unit}
                            </UiText>
                        </div>

                        <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-black/70 transition-all duration-500 ease-out"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>

                        <div className="flex justify-between items-end text-black/60">
                            <span className="text-xs font-medium">{subtext}</span>
                            {total && (
                                <span className="text-xs font-medium">
                                    / {total}{unit}
                                </span>
                            )}
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-baseline gap-1 mt-1">
                            <UiText variant="h3" weight="bold" className="text-black leading-none">
                                {value}
                            </UiText>
                            {unit && (
                                <UiText variant="small" weight="medium" className="text-black/60">
                                    {unit}
                                </UiText>
                            )}
                        </div>
                        {subtext && (
                            <UiText variant="small" className="text-black/50 mt-1 block leading-tight">
                                {subtext}
                            </UiText>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
