import { expect, test } from "../fixtures";
import { signIn } from "../helpers/auth";

test.describe("Sign In", () => {
  test("should display sign in form", async ({ page }) => {
    await page.goto("/sign-in");

    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("should show validation errors for empty fields", async ({ page }) => {
    await page.goto("/sign-in");
    await page.click('button[type="submit"]');

    // Check for error messages (adjust selectors based on your implementation)
    await expect(page.locator("text=/required/i")).toBeVisible();
  });

  test("should show error for invalid email", async ({ page }) => {
    await page.goto("/sign-in");
    await page.fill('[name="email"]', "invalid-email");
    await page.fill('[name="password"]', "password123");
    await page.click('button[type="submit"]');

    await expect(page.locator("text=/invalid email/i")).toBeVisible();
  });

  test.skip("should successfully sign in with valid credentials", async ({
    page,
  }) => {
    // Skip until API is mocked or test user is available
    await signIn(page, "test@example.com", "password123");
    await expect(page).toHaveURL("/");
  });

  test.skip("should show error for invalid credentials", async ({ page }) => {
    // Skip until API is mocked
    await signIn(page, "wrong@example.com", "wrongpassword");
    await expect(page.locator("text=/invalid credentials/i")).toBeVisible();
  });

  test("should navigate to sign up page", async ({ page }) => {
    await page.goto("/sign-in");
    // Adjust selector based on your UI
    await page.click("text=/sign up/i");
    await expect(page).toHaveURL(/sign-up/);
  });
});
