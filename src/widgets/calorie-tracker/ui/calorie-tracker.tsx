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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/primitives/card";

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
  const caloriesConsumed = caloriesTotal - caloriesRemaining;
  const percentage = (caloriesConsumed / caloriesTotal) * 100;
  const endAngle = 90 - (percentage / 100) * 360;

  const chartData = [
    {
      name: "consumed",
      calories: caloriesConsumed,
      fill: "var(--primary)",
    },
  ];

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>{t("title")}</CardTitle>
        {/* <CardDescription>{t("description")}</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]  max-w-[200px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={endAngle}
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
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
                          className="fill-foreground text-4xl font-bold"
                        >
                          {caloriesRemaining.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
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
      <CardFooter className="flex items-center justify-center gap-12">
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
