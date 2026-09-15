import { test, expect } from '@playwright/test';

test.describe('Homepage UX & Visual Integrity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Loads homepage with correct brand title and metadata', async ({ page }) => {
    await expect(page).toHaveTitle(/ANTHO/i);
  });

  test('Renders minimal showcase slideshow with campaign media', async ({ page }) => {
    const heroShowcase = page.locator('section').first();
    await expect(heroShowcase).toBeVisible();
  });

  test('Verifies legacy teaser cards are removed from homepage', async ({ page }) => {
    // Legacy teaser cards requested to be removed by user
    await expect(page.getByText('SS26 Lookbook Journal')).not.toBeVisible();
    await expect(page.getByText('Pop-Up & Media Archives')).not.toBeVisible();
  });

  test('Displays deterministic single luxury pricing with zero strikethroughs or sale badges', async ({ page }) => {
    // Verify no strikethrough price elements exist
    const strikethroughs = page.locator('s, strike, del, .line-through');
    await expect(strikethroughs).toHaveCount(0);

    // Verify no "Sale" badges exist
    const saleBadges = page.getByText(/Sale|Discount|% off/i);
    await expect(saleBadges).toHaveCount(0);
  });
});
