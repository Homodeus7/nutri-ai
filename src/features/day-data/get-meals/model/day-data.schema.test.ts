import { describe, it, expect } from "vitest";
import {
  dayDateSchema,
  parseDayDate,
  formatDayDate,
  getTodayDate,
} from "./day-data.schema";

describe("dayDateSchema", () => {
  it("validates correct date format", () => {
    expect(() => dayDateSchema.parse("2025-10-20")).not.toThrow();
    expect(() => dayDateSchema.parse("2025-01-01")).not.toThrow();
    expect(() => dayDateSchema.parse("2025-12-31")).not.toThrow();
  });

  it("rejects invalid date formats", () => {
    expect(() => dayDateSchema.parse("2025-1-1")).toThrow(
      "Date must be in format YYYY-MM-DD",
    );
    expect(() => dayDateSchema.parse("25-10-20")).toThrow(
      "Date must be in format YYYY-MM-DD",
    );
    expect(() => dayDateSchema.parse("2025/10/20")).toThrow(
      "Date must be in format YYYY-MM-DD",
    );
    expect(() => dayDateSchema.parse("20-10-2025")).toThrow(
      "Date must be in format YYYY-MM-DD",
    );
    expect(() => dayDateSchema.parse("")).toThrow(
      "Date must be in format YYYY-MM-DD",
    );
  });

  it("rejects non-string values", () => {
    expect(() => dayDateSchema.parse(null as any)).toThrow();
    expect(() => dayDateSchema.parse(undefined as any)).toThrow();
    expect(() => dayDateSchema.parse(123 as any)).toThrow();
    expect(() => dayDateSchema.parse(new Date() as any)).toThrow();
  });
});

describe("parseDayDate", () => {
  it("parses valid date", () => {
    expect(parseDayDate("2025-10-20")).toBe("2025-10-20");
  });

  it("throws on invalid date", () => {
    expect(() => parseDayDate("invalid")).toThrow();
  });
});

describe("formatDayDate", () => {
  it("formats Date object to YYYY-MM-DD", () => {
    const date = new Date("2025-10-20T12:00:00Z");
    const formatted = formatDayDate(date);
    expect(formatted).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("pads month and day with zeros", () => {
    const date = new Date("2025-01-05T12:00:00Z");
    const formatted = formatDayDate(date);
    expect(formatted).toMatch(/^\d{4}-01-0\d$/);
  });
});

describe("getTodayDate", () => {
  it("returns date in YYYY-MM-DD format", () => {
    const today = getTodayDate();
    expect(() => dayDateSchema.parse(today)).not.toThrow();
  });

  it("returns valid date string", () => {
    const today = getTodayDate();
    expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
