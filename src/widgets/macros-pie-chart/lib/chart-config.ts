export function getChartDimensions(isMobile: boolean) {
  return {
    innerRadius: isMobile ? 40 : 50,
    outerRadius: isMobile ? 70 : 110,
  };
}
