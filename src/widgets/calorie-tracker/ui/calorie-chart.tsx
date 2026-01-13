"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartContainer, type ChartConfig } from "@/shared/ui/primitives/chart";
import { cn } from "@/shared/lib/css";
import type { CalorieChartProps } from "../model/types";

const chartConfig = {} satisfies ChartConfig;

export function CalorieChart({
  data,
  endAngle,
  dimensions,
  centerLabel,
}: CalorieChartProps) {
  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <RadialBarChart
        data={data}
        startAngle={90}
        endAngle={endAngle}
        innerRadius={dimensions.innerRadius}
        outerRadius={dimensions.outerRadius}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={dimensions.polarRadius}
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
                      className={cn(
                        "text-lg md:text-2xl font-bold",
                        centerLabel.isWarning
                          ? "fill-destructive"
                          : "fill-foreground",
                      )}
                    >
                      {centerLabel.value}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + dimensions.labelOffset}
                      className="fill-muted-foreground text-xs md:text-sm"
                    >
                      {centerLabel.text}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
