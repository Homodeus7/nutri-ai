import { useState, useCallback } from "react";
import type { CreateMealMode } from "./types";

export function useDialogMode() {
  const [mode, setMode] = useState<CreateMealMode>("search");
  const [createProductName, setCreateProductName] = useState("");

  const switchToCreate = useCallback((initialName?: string) => {
    setCreateProductName(initialName ?? "");
    setMode("create");
  }, []);

  const switchToSearch = useCallback(() => {
    setMode("search");
  }, []);

  const reset = useCallback(() => {
    setMode("search");
    setCreateProductName("");
  }, []);

  return {
    mode,
    createProductName,
    switchToCreate,
    switchToSearch,
    reset,
  };
}
