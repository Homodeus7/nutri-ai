export interface CalorieTrackerProps {
  caloriesRemaining: number;
  caloriesTotal: number;
}

export interface DataItemProps {
  label: string;
  value: string | number;
  isWarning?: boolean;
}

export interface ChartDataItem {
  name: string;
  calories: number;
  fill: string;
}

export interface CalorieChartProps {
  data: ChartDataItem[];
  endAngle: number;
  dimensions: {
    innerRadius: number;
    outerRadius: number;
    polarRadius: [number, number];
    labelOffset: number;
  };
  centerLabel: {
    value: number | string;
    text: string;
    isWarning?: boolean;
  };
}
