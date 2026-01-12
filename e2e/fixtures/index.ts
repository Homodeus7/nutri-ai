import { test as base } from "@playwright/test";

/**
 * Extended test fixtures for common setup
 * Add custom fixtures here as needed
 */
export const test = base.extend({
  // Example: authenticated user fixture
  // authenticatedPage: async ({ page }, use) => {
  //   await page.goto('/sign-in');
  //   await page.fill('[name="email"]', 'test@example.com');
  //   await page.fill('[name="password"]', 'password123');
  //   await page.click('button[type="submit"]');
  //   await page.waitForURL('/diary');
  //   await use(page);
  // },
});

export { expect } from "@playwright/test";
