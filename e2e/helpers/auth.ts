import type { Page } from "@playwright/test";

/**
 * Helper functions for authentication flows
 */

export async function signIn(
  page: Page,
  email: string = "test@example.com",
  password: string = "password123",
) {
  await page.goto("/sign-in");
  await page.fill('[name="email"]', email);
  await page.fill('[name="password"]', password);
  await page.click('button[type="submit"]');
}

export async function signUp(
  page: Page,
  email: string,
  password: string,
  name?: string,
) {
  await page.goto("/sign-up");
  if (name) {
    await page.fill('[name="name"]', name);
  }
  await page.fill('[name="email"]', email);
  await page.fill('[name="password"]', password);
  await page.click('button[type="submit"]');
}

export async function signOut(page: Page) {
  // Adjust selector based on your UI
  await page.click('[data-testid="user-menu"]');
  await page.click('text="Sign Out"');
}
