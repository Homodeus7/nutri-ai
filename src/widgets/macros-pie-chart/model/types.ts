export interface MacrosPieChartProps {
  protein: number;
  fat: number;
  carbs: number;
  variant?: "side" | "bottom";
}

export interface ChartDataItem {
  name: string;
  value: number;
  grams: number;
  fill: string;
}
