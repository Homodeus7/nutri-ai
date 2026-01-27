import { expect, test } from "../fixtures";

test.describe("App Navigation", () => {
  test("should show diary page at root", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("/");
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
