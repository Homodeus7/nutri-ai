"use client";

import { ArrowUp, Loader2 } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/shared/ui/primitives/input-group";
import { useI18n } from "../i18n";
import {
  AI_PARSE_ERROR_CODES,
  type AiParseErrorCode,
} from "@/features/ai-parse";
import { UiText } from "@/shared/ui";

interface AiInputTabProps {
  text: string;
  onTextChange: (text: string) => void;
  onSubmit?: (text: string) => void;
  isPending?: boolean;
  errorCode?: AiParseErrorCode | null;
  onClearError?: () => void;
}

export function AiInputTab({
  text,
  onTextChange,
  onSubmit,
  isPending = false,
  errorCode,
  onClearError,
}: AiInputTabProps) {
  const { t } = useI18n();

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

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(e.target.value);
    if (errorCode && onClearError) {
      onClearError();
    }
  };

  const hasText = text.length > 0;

  const getErrorMessage = (): string | null => {
    if (!errorCode) return null;
    if (errorCode === AI_PARSE_ERROR_CODES.NO_ITEMS_FOUND) {
      return t("aiErrorNoItemsFound");
    }
    if (errorCode === AI_PARSE_ERROR_CODES.TOKEN_LIMIT_EXCEEDED) {
      return t("aiErrorTokenLimitExceeded");
    }
    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center px-4">
        {errorMessage ? (
          <p className="text-sm md:text-base text-destructive text-center">
            {errorMessage}
          </p>
        ) : (
          <UiText variant="h3" className="text-center">
            {t("aiInputQuestion")}
          </UiText>
        )}
      </div>

      <div className="px-4 pb-4">
        <InputGroup className="rounded-2xl bg-foreground/10 border-0 shadow-none">
          <InputGroupTextarea
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder={t("aiInputPlaceholder")}
            disabled={isPending}
          />
          <InputGroupAddon align="block-end" className="justify-end">
            {/* <InputGroupButton
              size="icon-sm"
              variant="ghost"
              onClick={handleVoiceClick}
              disabled={isPending}
              className="rounded-full"
            >
              <Mic className="size-5" />
            </InputGroupButton> */}
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
