"use client";

import { useState, useCallback } from "react";
import { Player } from "@remotion/player";
import { renderMediaOnWeb } from "@remotion/web-renderer";
import { Share, Download, Loader2 } from "lucide-react";
import { ControlledDialog } from "@/shared/ui";
import { UiButton } from "@/shared/ui/ui-button";
import {
  VIDEO_FPS,
  VERTICAL_WIDTH,
  VERTICAL_HEIGHT,
  DAILY_SUMMARY_DURATION,
} from "../lib/video-config";
import { DailySummary } from "./compositions/daily-summary";
import type { DailySummaryProps } from "../model/types";

interface VideoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  dailyData?: DailySummaryProps;
}

const playerStyle = { width: "100%", maxHeight: 500 } as const;
const FILE_NAME = "nutri-ai-daily.mp4";

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

function canShare() {
  return typeof navigator !== "undefined" && !!navigator.share && !!navigator.canShare;
}

async function shareOrDownload(blob: Blob) {
  const file = new File([blob], FILE_NAME, { type: "video/mp4" });

  if (canShare() && navigator.canShare({ files: [file] })) {
    await navigator.share({ files: [file] });
    return;
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = FILE_NAME;
  link.click();
  URL.revokeObjectURL(url);
}

export function VideoDialog({
  isOpen,
  onOpenChange,
  dailyData,
}: VideoDialogProps) {
  const [isRendering, setIsRendering] = useState(false);
  const inputProps = dailyData ?? defaultDailyData;

  const handleExport = useCallback(async () => {
    setIsRendering(true);
    try {
      const result = await renderMediaOnWeb({
        composition: {
          id: "DailySummary",
          component: DailySummary,
          durationInFrames: DAILY_SUMMARY_DURATION,
          fps: VIDEO_FPS,
          width: VERTICAL_WIDTH,
          height: VERTICAL_HEIGHT,
          defaultProps: inputProps,
        },
        inputProps,
        muted: true,
      });

      const blob = await result.getBlob();
      await shareOrDownload(blob);
    } finally {
      setIsRendering(false);
    }
  }, [inputProps]);

  const showShare = canShare();

  return (
    <ControlledDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Share Video"
      contentClassName="sm:max-w-[700px] max-h-[90vh] overflow-y-auto"
    >
      <div className="flex justify-center rounded-lg overflow-hidden bg-black">
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
          loop
        />
      </div>

      <div className="flex justify-end mt-4">
        <UiButton onClick={handleExport} disabled={isRendering}>
          {isRendering ? (
            <Loader2 className="size-4 animate-spin" />
          ) : showShare ? (
            <Share className="size-4" />
          ) : (
            <Download className="size-4" />
          )}
          {isRendering ? "Rendering..." : showShare ? "Share" : "Download MP4"}
        </UiButton>
      </div>
    </ControlledDialog>
  );
}
