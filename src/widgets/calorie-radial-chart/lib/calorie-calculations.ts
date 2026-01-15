export interface CalorieMetrics {
  consumed: number;
  remaining: number;
  total: number;
  percentage: number;
  cappedPercentage: number;
  isOverGoal: boolean;
  displayValue: number;
  endAngle: number;
}

export function calculateCalorieMetrics(
  caloriesTotal: number,
  caloriesRemaining: number,
): CalorieMetrics {
  const consumed = caloriesTotal - caloriesRemaining;
  const isOverGoal = caloriesRemaining < 0;
  const percentage = Math.round((consumed / caloriesTotal) * 100);
  const displayValue = Math.abs(caloriesRemaining);
  const cappedPercentage = Math.min(percentage, 100);
  const endAngle = 90 - (cappedPercentage / 100) * 360;

  return {
    consumed,
    remaining: caloriesRemaining,
    total: caloriesTotal,
    percentage,
    cappedPercentage,
    isOverGoal,
    displayValue,
    endAngle,
  };
}
