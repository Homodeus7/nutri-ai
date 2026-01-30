const FILE_NAME = "nutri-ai-daily.mp4";

export function canShare() {
  return (
    typeof navigator !== "undefined" &&
    !!navigator.share &&
    !!navigator.canShare
  );
}

export function downloadBlob(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = FILE_NAME;
  link.click();
  URL.revokeObjectURL(url);
}

export async function shareOrDownload(blob: Blob) {
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
