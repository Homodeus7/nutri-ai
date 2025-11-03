import { API_CONFIG } from "../config/api-config";

/**
 * Initialize MSW (Mock Service Worker) for API mocking
 * Only starts in browser when USE_MOCK_API is true
 *
 * @returns Promise that resolves when MSW is ready or immediately if not needed
 */
export async function initMSW(): Promise<void> {
  // Only run in browser
  if (typeof window === "undefined") {
    return;
  }

  // Only initialize if mock mode is enabled
  if (!API_CONFIG.USE_MOCK_API) {
    console.log("📡 Using real API:", API_CONFIG.API_BASE_URL);
    return;
  }

  console.log("🔧 Mock API mode enabled");

  try {
    const { getWorker } = await import("./browser");
    const worker = await getWorker();

    await worker.start({
      onUnhandledRequest: "bypass", // Don't warn about unhandled requests
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
    });

    console.log("✅ MSW started successfully");
  } catch (error) {
    console.error("❌ Failed to start MSW:", error);
  }
}
