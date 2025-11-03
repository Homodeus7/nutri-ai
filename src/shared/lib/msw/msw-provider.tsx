"use client";

import { useEffect } from "react";
import { initMSW } from "./init-msw";

interface MSWProviderProps {
  children?: React.ReactNode;
}

/**
 * MSW Provider component
 * Initializes Mock Service Worker in the background
 * Does not block rendering to avoid hydration issues
 */
export function MSWProvider({ children }: MSWProviderProps) {
  useEffect(() => {
    // Initialize MSW in the background (only in browser)
    // This doesn't block rendering to avoid hydration mismatch
    initMSW();
  }, []);

  // Always render children immediately to avoid hydration issues
  // MSW will start working once initialized (usually very fast)
  return <>{children}</>;
}
