export interface ChartDimensions {
  innerRadius: number;
  outerRadius: number;
  polarRadius: [number, number];
  labelOffset: number;
}

export const MOBILE_CHART_CONFIG: ChartDimensions = {
  innerRadius: 72,
  outerRadius: 150,
  polarRadius: [80, 66],
  labelOffset: 26,
};

export const DESKTOP_CHART_CONFIG: ChartDimensions = {
  innerRadius: 100,
  outerRadius: 190,
  polarRadius: [108, 88],
  labelOffset: 32,
};

export function getChartDimensions(isMobile: boolean): ChartDimensions {
  return isMobile ? MOBILE_CHART_CONFIG : DESKTOP_CHART_CONFIG;
}
