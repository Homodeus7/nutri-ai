"use client";

import { useState } from "react";
import { Mic, ArrowUp, Loader2 } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/shared/ui/primitives/input-group";
import { useI18n } from "../i18n";

interface AiInputTabProps {
  onSubmit?: (text: string) => void;
  isPending?: boolean;
}

export function AiInputTab({ onSubmit, isPending = false }: AiInputTabProps) {
  const { t } = useI18n();
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim() && onSubmit) {
      onSubmit(text.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleVoiceClick = () => {
    // Voice recording logic will be implemented later
  };

  const canSubmit = text.trim().length > 0 && !isPending;
  const hasText = text.length > 0;

  return (
    <div className="flex flex-col h-full">
      {/* Question header */}
      <div className="flex-1 flex items-center justify-center px-4">
        <h2 className="text-2xl font-semibold text-center">
          {t("aiInputQuestion")}
        </h2>
      </div>

      {/* Input area */}
      <div className="px-4 pb-4">
        <InputGroup className="rounded-2xl bg-foreground/10 border-0 shadow-none">
          <InputGroupTextarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("aiInputPlaceholder")}
            disabled={isPending}
          />
          <InputGroupAddon align="block-end" className="justify-end">
            {/* Voice button */}
            <InputGroupButton
              size="icon-sm"
              variant="ghost"
              onClick={handleVoiceClick}
              disabled={isPending}
              className="rounded-full"
            >
              <Mic className="size-5" />
            </InputGroupButton>

            {/* Submit/Voice mode button */}
            <InputGroupButton
              size="icon-sm"
              onClick={handleSubmit}
              disabled={!hasText}
              variant="default"
              className="rounded-full"
            >
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <ArrowUp className="size-4" />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
