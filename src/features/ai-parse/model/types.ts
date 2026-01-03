export const AI_PARSE_ERROR_CODES = {
  NO_ITEMS_FOUND: 2,
} as const;

export type AiParseErrorCode =
  (typeof AI_PARSE_ERROR_CODES)[keyof typeof AI_PARSE_ERROR_CODES];

export interface ApiErrorResponse {
  code?: number;
  message?: string;
  timestamp?: string;
  path?: string;
  extensions?: unknown[];
}
