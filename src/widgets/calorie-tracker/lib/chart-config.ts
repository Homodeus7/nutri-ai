export interface ChartDimensions {
  innerRadius: number;
  outerRadius: number;
  polarRadius: [number, number];
  labelOffset: number;
}

export const MOBILE_CHART_CONFIG: ChartDimensions = {
  innerRadius: 50,
  outerRadius: 100,
  polarRadius: [56, 44],
  labelOffset: 18,
};

export const DESKTOP_CHART_CONFIG: ChartDimensions = {
  innerRadius: 97,
  outerRadius: 169,
  polarRadius: [105, 89],
  labelOffset: 26,
};

export function getChartDimensions(isMobile: boolean): ChartDimensions {
  return isMobile ? MOBILE_CHART_CONFIG : DESKTOP_CHART_CONFIG;
}
