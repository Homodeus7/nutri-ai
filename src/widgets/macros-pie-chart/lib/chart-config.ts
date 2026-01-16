export function getChartDimensions(isMobile: boolean) {
  return {
    innerRadius: isMobile ? 45 : 50,
    outerRadius: isMobile ? 90 : 110,
  };
}
