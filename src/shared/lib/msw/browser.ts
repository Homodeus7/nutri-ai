/**
 * MSW browser worker for mocking API requests
 * Uses auto-generated mock handlers from orval
 *
 * IMPORTANT: Only import this module in the browser!
 * Use dynamic import to avoid SSR issues.
 */

// We export a function that lazily creates the worker
// This ensures setupWorker is never called on the server
export async function getWorker() {
  if (typeof window === "undefined") {
    throw new Error(
      "MSW browser worker can only be used in browser environment",
    );
  }

  const { setupWorker } = await import("msw/browser");
  const { getNutriAIFoodCalorieTrackerAPIMock } = await import(
    "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI"
  );

  return setupWorker(...getNutriAIFoodCalorieTrackerAPIMock());
}
