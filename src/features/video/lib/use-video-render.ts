"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { renderMediaOnWeb } from "@remotion/web-renderer";
import { toast } from "sonner";
import {
  VIDEO_FPS,
  VERTICAL_WIDTH,
  VERTICAL_HEIGHT,
  DAILY_SUMMARY_DURATION,
} from "./video-config";
import { DailySummary } from "../ui/compositions/daily-summary";
import type { DailySummaryProps } from "../model/types";

export function useVideoRender(
  inputProps: DailySummaryProps,
  isOpen: boolean,
) {
  const [isRendering, setIsRendering] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const renderTriggered = useRef(false);

  const render = useCallback(async () => {
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

  useEffect(() => {
    if (isOpen && !videoBlob && !isRendering && !renderTriggered.current) {
      renderTriggered.current = true;
      render();
    }

    if (!isOpen) {
      renderTriggered.current = false;
    }
  }, [isOpen, videoBlob, isRendering, render]);

  const reset = useCallback(() => {
    setVideoBlob(null);
    renderTriggered.current = false;
  }, []);

  return { isRendering, videoBlob, reset };
}
