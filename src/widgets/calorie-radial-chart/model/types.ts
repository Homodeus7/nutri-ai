export interface CalorieRadialChartProps {
  caloriesRemaining: number;
  caloriesTotal: number;
}

export interface ChartDataItem {
  name: string;
  calories: number;
  fill: string;
}

export interface ChartDimensions {
  innerRadius: number;
  outerRadius: number;
  polarRadius: [number, number];
  labelOffset: number;
}
