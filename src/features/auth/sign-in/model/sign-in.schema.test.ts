import { describe, expect, it } from "vitest";
import { signInSchema } from "./sign-in.schema";

describe("signInSchema", () => {
  describe("email validation", () => {
    it("should pass with valid email", () => {
      const result = signInSchema.safeParse({
        email: "user@example.com",
        password: "password123",
      });

      expect(result.success).toBe(true);
    });

    it("should fail with empty email", () => {
      const result = signInSchema.safeParse({
        email: "",
        password: "password123",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Email is required");
      }
    });

    it("should fail with invalid email format", () => {
      const result = signInSchema.safeParse({
        email: "invalid-email",
        password: "password123",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Please enter a valid email address",
        );
      }
    });

    it("should accept various valid email formats", () => {
      const validEmails = [
        "user@example.com",
        "user.name@example.com",
        "user+tag@example.co.uk",
        "user123@test-domain.com",
      ];

      validEmails.forEach((email) => {
        const result = signInSchema.safeParse({
          email,
          password: "password123",
        });
        expect(result.success).toBe(true);
      });
    });
  });

  describe("password validation", () => {
    it("should pass with valid password", () => {
      const result = signInSchema.safeParse({
        email: "user@example.com",
        password: "password123",
      });

      expect(result.success).toBe(true);
    });

    it("should fail with empty password", () => {
      const result = signInSchema.safeParse({
        email: "user@example.com",
        password: "",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Password is required");
      }
    });

    it("should fail with password shorter than 8 characters", () => {
      const result = signInSchema.safeParse({
        email: "user@example.com",
        password: "short",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Password must be at least 8 characters",
        );
      }
    });

    it("should accept password with exactly 8 characters", () => {
      const result = signInSchema.safeParse({
        email: "user@example.com",
        password: "12345678",
      });

      expect(result.success).toBe(true);
    });
  });

  describe("type inference", () => {
    it("should infer correct TypeScript type", () => {
      const validData = {
        email: "user@example.com",
        password: "password123",
      };

      const result = signInSchema.parse(validData);

      // TypeScript should infer the correct type
      expect(result.email).toBe(validData.email);
      expect(result.password).toBe(validData.password);
    });
  });
});
