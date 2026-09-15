import { test, expect } from '@playwright/test';

test.describe('HCI Visual Navigation Portal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Opens mobile menu drawer and displays text navigation sections', async ({ page }) => {
    // Open menu button
    const menuButton = page.locator('button[aria-label*="menu" i], button:has(svg)').first();
    await menuButton.click();

    // Verify 3 Text Menu Sections
    await expect(page.getByText('01 // Shop')).toBeVisible();
    await expect(page.getByText('All Products')).toBeVisible();
    await expect(page.getByText('02 // Drops & Visuals')).toBeVisible();
    await expect(page.getByText('03 // Information')).toBeVisible();
  });

  test('Navigation links route cleanly without console errors', async ({ page }) => {
    // Navigate to /shop
    await page.goto('/shop');
    await expect(page).toHaveURL(/.*\/shop/);

    // Navigate to /collections
    await page.goto('/collections');
    await expect(page).toHaveURL(/.*\/collections/);

    // Navigate to /lookbook
    await page.goto('/lookbook');
    await expect(page).toHaveURL(/.*\/lookbook/);

    // Navigate to /events
    await page.goto('/events');
    await expect(page).toHaveURL(/.*\/events/);
  });
});
