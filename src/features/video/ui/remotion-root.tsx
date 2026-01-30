import { Composition } from "remotion";
import { DailySummary } from "./compositions/daily-summary";
import {
  VIDEO_FPS,
  VERTICAL_WIDTH,
  VERTICAL_HEIGHT,
  DAILY_SUMMARY_DURATION,
} from "../lib/video-config";
import { dailySummarySchema } from "../model/types";

export function RemotionRoot() {
  return (
    <Composition
      id="DailySummary"
      component={DailySummary}
      durationInFrames={DAILY_SUMMARY_DURATION}
      fps={VIDEO_FPS}
      width={VERTICAL_WIDTH}
      height={VERTICAL_HEIGHT}
      schema={dailySummarySchema}
      defaultProps={{
        calories: 1850,
        caloriesGoal: 2500,
        protein: 120,
        fat: 65,
        carbs: 210,
        fiber: 28,
        proteinGoal: 150,
        fatGoal: 70,
        carbsGoal: 250,
        fiberGoal: 30,
        themeColor: "orange",
        date: "2025-01-30",
        meals: [
          { type: "Breakfast", name: "Oatmeal & Berries", totalKcal: 420 },
          { type: "Lunch", name: "Chicken Salad", totalKcal: 650 },
          { type: "Dinner", name: "Salmon & Rice", totalKcal: 780 },
        ],
      }}
    />
  );
}
