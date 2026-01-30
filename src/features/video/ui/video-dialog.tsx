"use client";

import { useCallback, useMemo } from "react";
import { Player } from "@remotion/player";
import { Share } from "lucide-react";
import { ControlledDialog } from "@/shared/ui";
import { UiButton } from "@/shared/ui/ui-button";
import {
  VIDEO_FPS,
  VERTICAL_WIDTH,
  VERTICAL_HEIGHT,
  DAILY_SUMMARY_DURATION,
} from "../lib/video-config";
import { useVideoRender } from "../lib/use-video-render";
import { shareOrDownload } from "../lib/share";
import { DailySummary } from "./compositions/daily-summary";
import type { DailySummaryProps } from "../model/types";

interface VideoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  dailyData?: DailySummaryProps;
}

const playerStyle = { width: "100%", maxHeight: 500 } as const;

const defaultDailyData: DailySummaryProps = {
  calories: 0,
  caloriesGoal: 2500,
  protein: 0,
  fat: 0,
  carbs: 0,
  fiber: 0,
  proteinGoal: 150,
  fatGoal: 70,
  carbsGoal: 250,
  fiberGoal: 30,
  themeColor: "orange",
  date: new Date().toISOString().slice(0, 10),
  meals: [],
};

export function VideoDialog({
  isOpen,
  onOpenChange,
  dailyData,
}: VideoDialogProps) {
  const inputProps = dailyData ?? defaultDailyData;
  const { isRendering, videoBlob } = useVideoRender(inputProps, isOpen);

  const handleShare = useCallback(async () => {
    if (!videoBlob) return;
    await shareOrDownload(videoBlob);
  }, [videoBlob]);

  const videoUrl = useMemo(
    () => (videoBlob ? URL.createObjectURL(videoBlob) : null),
    [videoBlob],
  );

  return (
    <ControlledDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Share Video"
      contentClassName="sm:max-w-[700px] max-h-[90vh] overflow-y-auto"
    >
      <div className="flex flex-col items-center">
        <div className="w-full flex justify-center rounded-lg overflow-hidden bg-black">
          {videoUrl ? (
            <video src={videoUrl} controls autoPlay loop style={playerStyle} />
          ) : (
            <Player
              component={DailySummary}
              inputProps={inputProps}
              durationInFrames={DAILY_SUMMARY_DURATION}
              fps={VIDEO_FPS}
              compositionWidth={VERTICAL_WIDTH}
              compositionHeight={VERTICAL_HEIGHT}
              style={playerStyle}
              controls
              autoPlay
            />
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <UiButton
          onClick={handleShare}
          disabled={isRendering}
          icon={<Share className="size-4" />}
          loading={isRendering}
        >
          Share
        </UiButton>
      </div>
    </ControlledDialog>
  );
}
