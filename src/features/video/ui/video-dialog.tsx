"use client";

import { useState, useCallback } from "react";
import { Player } from "@remotion/player";
import { renderMediaOnWeb } from "@remotion/web-renderer";
import { toast } from "sonner";
import { Share, Loader2 } from "lucide-react";
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
    try {
      await navigator.share({ files: [file] });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      downloadBlob(blob);
    }
    return;
  }

  downloadBlob(blob);
}

function downloadBlob(blob: Blob) {
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
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const inputProps = dailyData ?? defaultDailyData;

  const handleRender = useCallback(async () => {
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

      setVideoBlob(await result.getBlob());
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      toast.error("Failed to render video. Please try again.");
    } finally {
      setIsRendering(false);
    }
  }, [inputProps]);

  const handleShare = useCallback(async () => {
    if (!videoBlob) return;
    await shareOrDownload(videoBlob);
  }, [videoBlob]);

  const videoUrl = videoBlob ? URL.createObjectURL(videoBlob) : null;

  return (
    <ControlledDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Share Video"
      contentClassName="sm:max-w-[700px] max-h-[90vh] overflow-y-auto"
    >
      <div className="flex justify-center rounded-lg overflow-hidden bg-black">
        {videoUrl ? (
          <video
            src={videoUrl}
            controls
            autoPlay
            loop
            style={playerStyle}
          />
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
            loop
          />
        )}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        {videoBlob ? (
          <>
            <UiButton variant="outline" onClick={() => setVideoBlob(null)}>
              Re-render
            </UiButton>
            <UiButton onClick={handleShare}>
              <Share className="size-4" />
              Share
            </UiButton>
          </>
        ) : (
          <UiButton onClick={handleRender} disabled={isRendering}>
            {isRendering ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Share className="size-4" />
            )}
            {isRendering ? "Rendering..." : "Render Video"}
          </UiButton>
        )}
      </div>
    </ControlledDialog>
  );
}
