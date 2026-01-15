export function getChartDimensions(isMobile: boolean) {
  return {
    innerRadius: isMobile ? 40 : 60,
    outerRadius: isMobile ? 70 : 100,
  };
}
