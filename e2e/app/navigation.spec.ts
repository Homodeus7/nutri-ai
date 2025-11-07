import { expect, test } from "../fixtures";

test.describe("App Navigation", () => {
  test("should redirect from home to board", async ({ page }) => {
    await page.goto("/");
    // Based on CLAUDE.md: "/" redirects to "/board"
    await expect(page).toHaveURL("/board");
  });

  test("should show 403 page for forbidden access", async ({ page }) => {
    await page.goto("/403");
    await expect(page.locator("text=/403|forbidden/i")).toBeVisible();
  });

  test("should have correct meta tags", async ({ page }) => {
    await page.goto("/sign-in");

    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test("should apply theme correctly", async ({ page }) => {
    await page.goto("/sign-in");

    // Check for theme classes (adjust based on your theme implementation)
    const html = page.locator("html");
    const hasTheme = await html.evaluate((el) => {
      return (
        el.classList.contains("light") ||
        el.classList.contains("dark") ||
        el.hasAttribute("data-theme")
      );
    });

    expect(hasTheme).toBe(true);
  });
});
