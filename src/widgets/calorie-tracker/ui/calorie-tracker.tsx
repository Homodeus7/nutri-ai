"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { ChartContainer, type ChartConfig } from "@/shared/ui/primitives/chart";
import { UiText } from "@/shared/ui/ui-text";
import { useI18n } from "../i18n";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/primitives/card";
import { useIsMobile } from "@/shared/lib/use-media-query";

interface CalorieTrackerProps {
  caloriesRemaining: number;
  caloriesTotal: number;
}

const chartConfig = {
  calories: {
    label: "Calories",
  },
  consumed: {
    label: "Consumed",
    color: "hsl(var(--primary-foreground))",
  },
} satisfies ChartConfig;

export function CalorieTracker({
  caloriesRemaining,
  caloriesTotal,
}: CalorieTrackerProps) {
  const { t } = useI18n();
  const isMobile = useIsMobile();
  const caloriesConsumed = caloriesTotal - caloriesRemaining;
  const percentage = (caloriesConsumed / caloriesTotal) * 100;
  const endAngle = 90 - (percentage / 100) * 360;

  const innerRadius = isMobile ? 50 : 80;
  const outerRadius = isMobile ? 100 : 140;
  const polarRadius: [number, number] = isMobile ? [56, 44] : [86, 74];
  const labelOffset = isMobile ? 18 : 22;

  const chartData = [
    {
      name: "consumed",
      calories: caloriesConsumed,
      fill: "var(--primary)",
    },
  ];

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0 px-3 md:px-6">
        <CardTitle className="text-base md:text-lg">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 px-2 md:px-6 ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[140px] max-w-[140px] md:max-h-[180px] md:max-w-[180px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={endAngle}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={polarRadius}
            />
            <RadialBar dataKey="calories" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-lg md:text-2xl font-bold"
                        >
                          {caloriesRemaining.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + labelOffset}
                          className="fill-muted-foreground text-xs md:text-sm"
                        >
                          {t("left")}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-8 md:gap-12 py-3 md:py-4">
        <UiText variant="small" weight="semibold">
          0
        </UiText>
        <UiText variant="small" weight="semibold">
          {caloriesTotal}
        </UiText>
      </CardFooter>
    </Card>
  );
}
