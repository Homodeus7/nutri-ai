import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../fixtures";

test.describe("Accessibility", () => {
  test("sign-in page should not have accessibility violations", async ({
    page,
  }) => {
    await page.goto("/sign-in");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("diary page should not have accessibility violations", async ({
    page,
  }) => {
    await page.goto("/diary");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
